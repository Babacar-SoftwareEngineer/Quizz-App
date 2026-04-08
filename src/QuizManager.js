/**
 * Gestionnaire de quiz avec optimisations de performance
 */
class QuizManager {
  constructor(userManager) {
    this.userManager = userManager;
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.startTime = 0;
    this.selectedAnswer = null;
    this.answered = false;
    this.questionHistory = []; // Pour permettre de revenir en arrière
    this.quizCache = new Map(); // Cache des quiz chargés
  }

  startQuiz(quizId) {
    try {
      if (!quizData || !quizData[quizId]) {
        throw new Error('Quiz non trouvé');
      }

      // Validation des données du quiz
      ValidationUtils.validateQuizData({ [quizId]: quizData[quizId] });

      this.currentQuiz = { ...quizData[quizId] }; // Copie pour éviter les modifications
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.startTime = Date.now();
      this.selectedAnswer = null;
      this.answered = false;
      this.questionHistory = [];

      // Cacher le quiz pour les accès futurs
      this.quizCache.set(quizId, this.currentQuiz);

      Analytics.trackQuizStart(quizId);

    } catch (error) {
      Analytics.trackError(error, 'QuizManager.startQuiz');
      throw error;
    }
  }

  getCurrentQuestion() {
    if (!this.currentQuiz || this.currentQuestionIndex >= this.currentQuiz.questions.length) {
      return null;
    }

    const question = this.currentQuiz.questions[this.currentQuestionIndex];

    // Retourner une copie pour éviter les modifications accidentelles
    return {
      ...question,
      options: [...question.options]
    };
  }

  selectAnswer(answerIndex) {
    if (this.answered || !this.currentQuiz) {
      return false;
    }

    try {
      const question = this.getCurrentQuestion();
      if (!question || answerIndex < 0 || answerIndex >= question.options.length) {
        throw new Error('Index de réponse invalide');
      }

      this.selectedAnswer = answerIndex;
      this.answered = true;

      const isCorrect = answerIndex === question.correct;
      if (isCorrect) {
        this.score++;
      }

      // Enregistrer dans l'historique
      this.questionHistory.push({
        questionIndex: this.currentQuestionIndex,
        selectedAnswer: answerIndex,
        correctAnswer: question.correct,
        isCorrect,
        timeSpent: Date.now() - this.startTime
      });

      return isCorrect;
    } catch (error) {
      Analytics.trackError(error, 'QuizManager.selectAnswer');
      return false;
    }
  }

  nextQuestion() {
    if (!this.answered || !this.currentQuiz) {
      return false;
    }

    try {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.answered = false;

      const hasNext = this.currentQuestionIndex < this.currentQuiz.questions.length;

      if (!hasNext) {
        // Quiz terminé, sauvegarder automatiquement
        this.saveScore();
      }

      return hasNext;
    } catch (error) {
      Analytics.trackError(error, 'QuizManager.nextQuestion');
      return false;
    }
  }

  // Nouvelle méthode pour revenir en arrière
  previousQuestion() {
    if (this.currentQuestionIndex === 0 || !this.currentQuiz) {
      return false;
    }

    try {
      this.currentQuestionIndex--;

      // Restaurer l'état de la question précédente
      const previousState = this.questionHistory[this.currentQuestionIndex];
      if (previousState) {
        this.selectedAnswer = previousState.selectedAnswer;
        this.answered = true;
        this.score = this.questionHistory
          .slice(0, this.currentQuestionIndex + 1)
          .filter(h => h.isCorrect).length;
      } else {
        this.selectedAnswer = null;
        this.answered = false;
      }

      return true;
    } catch (error) {
      Analytics.trackError(error, 'QuizManager.previousQuestion');
      return false;
    }
  }

  getResults() {
    if (!this.currentQuiz) {
      throw new Error('Aucun quiz en cours');
    }

    try {
      const endTime = Date.now();
      const timeElapsed = Math.floor((endTime - this.startTime) / 1000);
      const percentage = this.currentQuiz.questions.length > 0
        ? Math.round((this.score / this.currentQuiz.questions.length) * 100)
        : 0;

      return {
        score: this.score,
        totalQuestions: this.currentQuiz.questions.length,
        percentage,
        timeElapsed,
        quizTitle: this.currentQuiz.title,
        quizId: this.getCurrentQuizId(),
        completedAt: new Date().toISOString(),
        questionHistory: [...this.questionHistory]
      };
    } catch (error) {
      Analytics.trackError(error, 'QuizManager.getResults');
      throw error;
    }
  }

  saveScore() {
    if (!this.currentQuiz || !this.userManager) {
      return false;
    }

    try {
      const results = this.getResults();
      return this.userManager.saveScore(
        this.getCurrentQuizId(),
        results.score,
        results.totalQuestions,
        results.timeElapsed
      );
    } catch (error) {
      Analytics.trackError(error, 'QuizManager.saveScore');
      return false;
    }
  }

  // Méthodes utilitaires
  getCurrentQuizId() {
    if (!this.currentQuiz) return null;

    // Trouver l'ID du quiz actuel
    for (const [quizId, quiz] of Object.entries(quizData)) {
      if (quiz.title === this.currentQuiz.title) {
        return quizId;
      }
    }
    return null;
  }

  getProgress() {
    if (!this.currentQuiz) return 0;

    return Math.round((this.currentQuestionIndex / this.currentQuiz.questions.length) * 100);
  }

  isCompleted() {
    return this.currentQuiz && this.currentQuestionIndex >= this.currentQuiz.questions.length;
  }

  reset() {
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.startTime = 0;
    this.selectedAnswer = null;
    this.answered = false;
    this.questionHistory = [];
  }

  // Méthodes pour les statistiques avancées
  getQuestionStats() {
    if (!this.questionHistory.length) return null;

    const totalTime = this.questionHistory.reduce((sum, h) => sum + h.timeSpent, 0);
    const averageTimePerQuestion = totalTime / this.questionHistory.length;

    const correctByDifficulty = this.questionHistory.reduce((acc, h, index) => {
      // Simuler une difficulté basée sur l'index (en production, utiliser les vraies difficultés)
      const difficulty = index < 3 ? 'easy' : index < 7 ? 'medium' : 'hard';
      if (!acc[difficulty]) acc[difficulty] = { correct: 0, total: 0 };
      acc[difficulty].total++;
      if (h.isCorrect) acc[difficulty].correct++;
      return acc;
    }, {});

    return {
      totalQuestions: this.questionHistory.length,
      totalTime,
      averageTimePerQuestion,
      correctByDifficulty
    };
  }

  // Cache management
  preloadQuiz(quizId) {
    if (this.quizCache.has(quizId)) {
      return this.quizCache.get(quizId);
    }

    if (quizData[quizId]) {
      this.quizCache.set(quizId, { ...quizData[quizId] });
      return this.quizCache.get(quizId);
    }

    return null;
  }

  clearCache() {
    this.quizCache.clear();
  }

  // Export des résultats pour partage
  exportResults() {
    try {
      const results = this.getResults();
      return {
        ...results,
        exportedAt: new Date().toISOString(),
        appVersion: '1.0.0'
      };
    } catch (error) {
      Analytics.trackError(error, 'QuizManager.exportResults');
      return null;
    }
  }
}