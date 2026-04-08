/**
 * Tests d'intégration pour l'application Quiz
 */
describe('Quiz App Integration', () => {
  let userManager;
  let quizManager;
  let uiManager;

  beforeEach(() => {
    // Reset du DOM et des mocks
    document.body.innerHTML = `
      <div id="app">
        <div class="screen screen-auth active">
          <input id="login-username" value="testuser" />
          <input id="login-password" value="password123" />
          <button id="btn-login"></button>
          <input id="register-username" />
          <input id="register-email" />
          <input id="register-password" />
          <button id="btn-register"></button>
          <button id="btn-guest"></button>
        </div>
        <div class="screen screen-quiz-select">
          <div id="quiz-grid"></div>
          <span id="current-user"></span>
          <button id="btn-logout"></button>
        </div>
        <div class="screen screen-question">
          <p id="question-number"></p>
          <h2 id="question-text"></h2>
          <div id="options-container"></div>
          <button id="btn-next"></button>
        </div>
        <div class="screen screen-result">
          <span id="result-score"></span>
          <span id="result-total"></span>
          <span id="result-time"></span>
          <p id="result-message"></p>
          <button id="btn-restart"></button>
          <button id="btn-back-to-select"></button>
        </div>
      </div>
    `;

    // Reset localStorage
    localStorage.clear();

    // Initialiser les gestionnaires
    userManager = new UserManager();
    quizManager = new QuizManager(userManager);
    uiManager = new UIManager(userManager, quizManager);
  });

  describe('Flux complet utilisateur non connecté', () => {
    test('devrait permettre de jouer en tant qu\'invité', () => {
      // Continuer en tant qu'invité
      uiManager.continueAsGuest();

      // Vérifier qu'on est sur l'écran de sélection
      expect(document.querySelector('.screen-quiz-select').classList.contains('active')).toBe(true);
      expect(document.querySelector('.screen-auth').classList.contains('active')).toBe(false);

      // Sélectionner un quiz
      uiManager.selectQuiz('general');

      // Vérifier qu'on est sur l'écran de question
      expect(document.querySelector('.screen-question').classList.contains('active')).toBe(true);

      // Répondre à une question
      const mockQuestion = quizManager.getCurrentQuestion();
      expect(mockQuestion).toBeDefined();

      // Simuler une réponse correcte
      quizManager.selectAnswer(mockQuestion.correct);

      // Passer à la question suivante
      const hasNext = quizManager.nextQuestion();
      expect(hasNext).toBe(true);

      // Terminer le quiz
      while (quizManager.nextQuestion()) {
        const currentQ = quizManager.getCurrentQuestion();
        if (currentQ) {
          quizManager.selectAnswer(currentQ.correct);
          quizManager.nextQuestion();
        }
      }

      // Afficher les résultats
      uiManager.showResults();

      // Vérifier qu'on est sur l'écran de résultats
      expect(document.querySelector('.screen-result').classList.contains('active')).toBe(true);

      const results = quizManager.getResults();
      expect(results.score).toBeGreaterThan(0);
      expect(results.totalQuestions).toBe(10);
    });
  });

  describe('Flux complet utilisateur connecté', () => {
    test('devrait permettre l\'inscription, connexion et jeu complet', () => {
      // Inscription
      document.getElementById('register-username').value = 'testuser';
      document.getElementById('register-email').value = 'test@example.com';
      document.getElementById('register-password').value = 'password123';

      uiManager.handleRegister();

      // Vérifier que l'utilisateur est inscrit
      expect(userManager.users['testuser']).toBeDefined();

      // Connexion
      document.getElementById('login-username').value = 'testuser';
      document.getElementById('login-password').value = 'password123';

      uiManager.handleLogin();

      // Vérifier que l'utilisateur est connecté
      expect(userManager.isLoggedIn()).toBe(true);
      expect(userManager.getCurrentUser()).toBe('testuser');

      // Jouer un quiz
      uiManager.selectQuiz('general');

      // Répondre à toutes les questions correctement
      let questionCount = 0;
      while (questionCount < 10) {
        const question = quizManager.getCurrentQuestion();
        if (question) {
          quizManager.selectAnswer(question.correct);
          quizManager.nextQuestion();
          questionCount++;
        } else {
          break;
        }
      }

      // Sauvegarder le score
      quizManager.saveScore();

      // Vérifier que le score est sauvegardé
      const userData = userManager.getUserData();
      expect(userData.scores).toHaveLength(1);
      expect(userData.scores[0].percentage).toBe(100);

      // Vérifier les statistiques
      const stats = userManager.getUserStats();
      expect(stats.totalQuizzes).toBe(1);
      expect(stats.averageScore).toBe(100);
      expect(stats.bestScore).toBe(100);
    });
  });

  describe('Gestion des erreurs', () => {
    test('devrait gérer les erreurs d\'authentification', () => {
      // Tenter de se connecter avec de mauvais identifiants
      document.getElementById('login-username').value = 'wronguser';
      document.getElementById('login-password').value = 'wrongpass';

      expect(() => {
        uiManager.handleLogin();
      }).toThrow();

      // Vérifier qu'on reste sur l'écran d'authentification
      expect(document.querySelector('.screen-auth').classList.contains('active')).toBe(true);
    });

    test('devrait gérer les erreurs de quiz', () => {
      // Tenter de démarrer un quiz inexistant
      expect(() => {
        quizManager.startQuiz('nonexistent');
      }).toThrow();
    });
  });

  describe('Persistance des données', () => {
    test('devrait persister les données utilisateur', () => {
      // Inscription et connexion
      userManager.register('persistuser', 'persist@example.com', 'password123');
      userManager.login('persistuser', 'password123');

      // Jouer un quiz
      quizManager.startQuiz('general');
      // Simuler quelques réponses
      const question = quizManager.getCurrentQuestion();
      quizManager.selectAnswer(question.correct);
      quizManager.saveScore();

      // Créer une nouvelle instance (simule un rechargement de page)
      const newUserManager = new UserManager();
      const newQuizManager = new QuizManager(newUserManager);

      // Vérifier que les données sont persistées
      expect(newUserManager.users['persistuser']).toBeDefined();
      expect(newUserManager.users['persistuser'].scores).toHaveLength(1);
    });
  });

  describe('Performance', () => {
    test('devrait charger rapidement les données', () => {
      const startTime = Date.now();

      // Inscription
      userManager.register('performuser', 'perf@example.com', 'password123');

      // Connexion
      userManager.login('performuser', 'password123');

      // Démarrage de quiz
      quizManager.startQuiz('general');

      // Réponses rapides
      for (let i = 0; i < 5; i++) {
        const question = quizManager.getCurrentQuestion();
        if (question) {
          quizManager.selectAnswer(question.correct);
          quizManager.nextQuestion();
        }
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Devrait prendre moins de 100ms
      expect(duration).toBeLessThan(100);
    });
  });
});