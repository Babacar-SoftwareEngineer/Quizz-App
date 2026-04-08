/**
 * Tests pour QuizManager
 */
describe('QuizManager', () => {
  let quizManager;
  let mockUserManager;

  beforeEach(() => {
    mockUserManager = {
      isLoggedIn: jest.fn(),
      saveScore: jest.fn()
    };
    quizManager = new QuizManager(mockUserManager);
  });

  describe('Initialisation', () => {
    test('devrait initialiser avec les valeurs par défaut', () => {
      expect(quizManager.currentQuiz).toBeNull();
      expect(quizManager.currentQuestionIndex).toBe(0);
      expect(quizManager.score).toBe(0);
      expect(quizManager.startTime).toBe(0);
      expect(quizManager.selectedAnswer).toBeNull();
      expect(quizManager.answered).toBe(false);
    });
  });

  describe('Démarrage du quiz', () => {
    test('devrait démarrer un quiz correctement', () => {
      const mockQuiz = {
        title: 'Test Quiz',
        questions: [
          { question: 'Q1', options: ['A', 'B'], correct: 0 },
          { question: 'Q2', options: ['C', 'D'], correct: 1 }
        ]
      };

      // Mock quizData
      global.quizData = {
        test: mockQuiz
      };

      quizManager.startQuiz('test');

      expect(quizManager.currentQuiz).toBe(mockQuiz);
      expect(quizManager.currentQuestionIndex).toBe(0);
      expect(quizManager.score).toBe(0);
      expect(quizManager.startTime).toBeGreaterThan(0);
      expect(quizManager.selectedAnswer).toBeNull();
      expect(quizManager.answered).toBe(false);
    });
  });

  describe('Récupération des questions', () => {
    beforeEach(() => {
      const mockQuiz = {
        title: 'Test Quiz',
        questions: [
          { question: 'Q1', options: ['A', 'B'], correct: 0 },
          { question: 'Q2', options: ['C', 'D'], correct: 1 }
        ]
      };

      global.quizData = {
        test: mockQuiz
      };

      quizManager.startQuiz('test');
    });

    test('devrait retourner la première question', () => {
      const question = quizManager.getCurrentQuestion();

      expect(question).toEqual({
        question: 'Q1',
        options: ['A', 'B'],
        correct: 0
      });
    });

    test('devrait retourner null après la dernière question', () => {
      quizManager.currentQuestionIndex = 2; // Après la dernière question
      const question = quizManager.getCurrentQuestion();

      expect(question).toBeNull();
    });
  });

  describe('Sélection des réponses', () => {
    beforeEach(() => {
      const mockQuiz = {
        title: 'Test Quiz',
        questions: [
          { question: 'Q1', options: ['A', 'B'], correct: 0 },
          { question: 'Q2', options: ['C', 'D'], correct: 1 }
        ]
      };

      global.quizData = {
        test: mockQuiz
      };

      quizManager.startQuiz('test');
    });

    test('devrait accepter une réponse correcte', () => {
      const result = quizManager.selectAnswer(0); // Bonne réponse

      expect(result).toBe(true);
      expect(quizManager.selectedAnswer).toBe(0);
      expect(quizManager.answered).toBe(true);
      expect(quizManager.score).toBe(1);
    });

    test('devrait accepter une réponse incorrecte', () => {
      const result = quizManager.selectAnswer(1); // Mauvaise réponse

      expect(result).toBe(false);
      expect(quizManager.selectedAnswer).toBe(1);
      expect(quizManager.answered).toBe(true);
      expect(quizManager.score).toBe(0);
    });

    test('devrait empêcher la sélection multiple', () => {
      quizManager.selectAnswer(0);
      quizManager.selectAnswer(1); // Devrait être ignoré

      expect(quizManager.selectedAnswer).toBe(0);
      expect(quizManager.score).toBe(1);
    });
  });

  describe('Navigation entre questions', () => {
    beforeEach(() => {
      const mockQuiz = {
        title: 'Test Quiz',
        questions: [
          { question: 'Q1', options: ['A', 'B'], correct: 0 },
          { question: 'Q2', options: ['C', 'D'], correct: 1 }
        ]
      };

      global.quizData = {
        test: mockQuiz
      };

      quizManager.startQuiz('test');
    });

    test('devrait passer à la question suivante', () => {
      quizManager.selectAnswer(0);
      const hasNext = quizManager.nextQuestion();

      expect(hasNext).toBe(true);
      expect(quizManager.currentQuestionIndex).toBe(1);
      expect(quizManager.selectedAnswer).toBeNull();
      expect(quizManager.answered).toBe(false);
    });

    test('devrait retourner false à la dernière question', () => {
      quizManager.selectAnswer(0);
      quizManager.nextQuestion(); // Va à la question 2
      quizManager.selectAnswer(1);
      const hasNext = quizManager.nextQuestion(); // Après la dernière

      expect(hasNext).toBe(false);
    });

    test('devrait empêcher la navigation sans réponse', () => {
      const hasNext = quizManager.nextQuestion();

      expect(hasNext).toBe(false);
      expect(quizManager.currentQuestionIndex).toBe(0);
    });
  });

  describe('Résultats du quiz', () => {
    beforeEach(() => {
      const mockQuiz = {
        title: 'Test Quiz',
        questions: [
          { question: 'Q1', options: ['A', 'B'], correct: 0 },
          { question: 'Q2', options: ['C', 'D'], correct: 1 }
        ]
      };

      global.quizData = {
        test: mockQuiz
      };

      quizManager.startQuiz('test');
      quizManager.selectAnswer(0); // Bonne réponse
      quizManager.nextQuestion();
      quizManager.selectAnswer(1); // Bonne réponse
    });

    test('devrait calculer les résultats correctement', () => {
      const results = quizManager.getResults();

      expect(results.score).toBe(2);
      expect(results.totalQuestions).toBe(2);
      expect(results.percentage).toBe(100);
      expect(results.quizTitle).toBe('Test Quiz');
      expect(results.timeElapsed).toBeGreaterThanOrEqual(0);
    });

    test('devrait sauvegarder le score si l\'utilisateur est connecté', () => {
      mockUserManager.isLoggedIn.mockReturnValue(true);

      quizManager.saveScore();

      expect(mockUserManager.saveScore).toHaveBeenCalledWith(
        'test',
        2,
        2,
        expect.any(Number)
      );
    });

    test('devrait ne pas sauvegarder le score si l\'utilisateur n\'est pas connecté', () => {
      mockUserManager.isLoggedIn.mockReturnValue(false);

      quizManager.saveScore();

      expect(mockUserManager.saveScore).not.toHaveBeenCalled();
    });
  });

  describe('Gestion des erreurs', () => {
    test('devrait gérer le cas où quizData n\'existe pas', () => {
      global.quizData = {};

      expect(() => {
        quizManager.startQuiz('nonexistent');
      }).toThrow();
    });

    test('devrait gérer les appels de méthodes sans quiz démarré', () => {
      expect(quizManager.getCurrentQuestion()).toBeNull();
      expect(quizManager.selectAnswer(0)).toBe(false);
      expect(quizManager.nextQuestion()).toBe(false);
    });
  });
});