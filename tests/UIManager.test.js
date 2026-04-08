/**
 * Tests pour UIManager
 */
describe('UIManager', () => {
  let uiManager;
  let mockUserManager;
  let mockQuizManager;

  beforeEach(() => {
    // Reset du DOM
    document.body.innerHTML = `
      <div id="app">
        <div class="screen screen-auth active">
          <input id="login-username" />
          <input id="login-password" />
          <button id="btn-login"></button>
          <input id="register-username" />
          <input id="register-email" />
          <input id="register-password" />
          <button id="btn-register"></button>
          <button id="btn-guest"></button>
          <a id="show-register"></a>
          <a id="show-login"></a>
        </div>
        <div class="screen screen-quiz-select">
          <div id="quiz-grid"></div>
          <span id="current-user"></span>
          <button id="btn-logout"></button>
        </div>
        <div class="screen screen-start">
          <button id="btn-start"></button>
          <button id="btn-back-to-select"></button>
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
          <button id="share-twitter"></button>
          <button id="share-facebook"></button>
          <button id="share-whatsapp"></button>
          <button id="share-copy"></button>
        </div>
        <div class="screen screen-dashboard">
          <span id="total-quizzes"></span>
          <span id="average-score"></span>
          <span id="best-score"></span>
          <div id="scores-list"></div>
          <button id="btn-dashboard-back"></button>
        </div>
      </div>
    `;

    // Mocks
    mockUserManager = {
      isLoggedIn: jest.fn(),
      getCurrentUser: jest.fn(),
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      getUserStats: jest.fn(),
      getUserData: jest.fn()
    };

    mockQuizManager = {
      startQuiz: jest.fn(),
      getCurrentQuestion: jest.fn(),
      selectAnswer: jest.fn(),
      nextQuestion: jest.fn(),
      getResults: jest.fn(),
      saveScore: jest.fn(),
      currentQuiz: null,
      currentQuestionIndex: 0
    };

    uiManager = new UIManager(mockUserManager, mockQuizManager);
  });

  describe('Initialisation', () => {
    test('devrait lier les événements correctement', () => {
      expect(document.getElementById('btn-login')).toBeDefined();
      expect(document.getElementById('btn-register')).toBeDefined();
      expect(document.getElementById('btn-guest')).toBeDefined();
    });

    test('devrait afficher l\'écran d\'authentification si non connecté', () => {
      mockUserManager.isLoggedIn.mockReturnValue(false);

      // Re-initialiser pour déclencher la logique d'initialisation
      uiManager = new UIManager(mockUserManager, mockQuizManager);

      expect(document.querySelector('.screen-auth').classList.contains('active')).toBe(true);
    });

    test('devrait afficher la sélection de quiz si connecté', () => {
      mockUserManager.isLoggedIn.mockReturnValue(true);

      uiManager = new UIManager(mockUserManager, mockQuizManager);

      expect(document.querySelector('.screen-quiz-select').classList.contains('active')).toBe(true);
    });
  });

  describe('Authentification', () => {
    test('devrait gérer l\'inscription avec succès', () => {
      document.getElementById('register-username').value = 'testuser';
      document.getElementById('register-email').value = 'test@example.com';
      document.getElementById('register-password').value = 'password123';

      mockUserManager.register.mockReturnValue(true);

      uiManager.handleRegister();

      expect(mockUserManager.register).toHaveBeenCalledWith('testuser', 'test@example.com', 'password123');
    });

    test('devrait afficher une erreur lors de l\'inscription échouée', () => {
      document.getElementById('register-username').value = 'testuser';
      document.getElementById('register-email').value = 'test@example.com';
      document.getElementById('register-password').value = 'password123';

      mockUserManager.register.mockImplementation(() => {
        throw new Error('Erreur d\'inscription');
      });

      uiManager.handleRegister();

      expect(global.alert).toHaveBeenCalledWith('Erreur d\'inscription');
    });

    test('devrait gérer la connexion avec succès', () => {
      document.getElementById('login-username').value = 'testuser';
      document.getElementById('login-password').value = 'password123';

      mockUserManager.login.mockReturnValue(true);

      uiManager.handleLogin();

      expect(mockUserManager.login).toHaveBeenCalledWith('testuser', 'password123');
    });

    test('devrait permettre de continuer en tant qu\'invité', () => {
      uiManager.continueAsGuest();

      expect(document.querySelector('.screen-quiz-select').classList.contains('active')).toBe(true);
    });

    test('devrait basculer entre les formulaires d\'authentification', () => {
      uiManager.showRegisterForm();

      expect(document.getElementById('login-form').style.display).toBe('none');
      expect(document.getElementById('register-form').style.display).toBe('block');

      uiManager.showLoginForm();

      expect(document.getElementById('register-form').style.display).toBe('none');
      expect(document.getElementById('login-form').style.display).toBe('block');
    });
  });

  describe('Sélection de quiz', () => {
    beforeEach(() => {
      global.quizData = {
        general: {
          title: 'Culture Générale',
          description: 'Testez vos connaissances générales',
          difficulty: 'medium',
          questions: []
        },
        science: {
          title: 'Sciences',
          description: 'Questions scientifiques',
          difficulty: 'hard',
          questions: []
        }
      };
    });

    test('devrait rendre la grille de quiz', () => {
      uiManager.renderQuizGrid();

      const grid = document.getElementById('quiz-grid');
      expect(grid.children).toHaveLength(2);
      expect(grid.children[0].textContent).toContain('Culture Générale');
      expect(grid.children[1].textContent).toContain('Sciences');
    });

    test('devrait sélectionner un quiz', () => {
      uiManager.selectQuiz('general');

      expect(mockQuizManager.startQuiz).toHaveBeenCalledWith('general');
      expect(document.querySelector('.screen-question').classList.contains('active')).toBe(true);
    });

    test('devrait mettre à jour les informations utilisateur', () => {
      mockUserManager.isLoggedIn.mockReturnValue(true);
      mockUserManager.getCurrentUser.mockReturnValue('testuser');

      uiManager.updateUserInfo();

      expect(document.getElementById('current-user').textContent).toBe('testuser');
      expect(document.querySelector('.user-info').style.display).toBe('flex');
    });
  });

  describe('Affichage des questions', () => {
    beforeEach(() => {
      const mockQuestion = {
        question: 'Test Question?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 1
      };

      mockQuizManager.getCurrentQuestion.mockReturnValue(mockQuestion);
      mockQuizManager.currentQuiz = { questions: [mockQuestion, mockQuestion] };
      mockQuizManager.currentQuestionIndex = 0;
    });

    test('devrait afficher une question correctement', () => {
      uiManager.displayQuestion();

      expect(document.getElementById('question-number').textContent).toBe('Question 1/2');
      expect(document.getElementById('question-text').textContent).toBe('Test Question?');

      const options = document.getElementById('options-container');
      expect(options.children).toHaveLength(4);
      expect(options.children[0].textContent).toBe('Option A');
    });

    test('devrait gérer la sélection de réponse', () => {
      uiManager.displayQuestion();

      const firstOption = document.querySelector('.option-button');
      firstOption.click();

      expect(mockQuizManager.selectAnswer).toHaveBeenCalledWith(0, firstOption);
    });
  });

  describe('Résultats', () => {
    beforeEach(() => {
      mockQuizManager.getResults.mockReturnValue({
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        timeElapsed: 120,
        quizTitle: 'Test Quiz'
      });
    });

    test('devrait afficher les résultats correctement', () => {
      uiManager.showResults();

      expect(document.getElementById('result-score').textContent).toBe('8');
      expect(document.getElementById('result-total').textContent).toBe('10');
      expect(document.getElementById('result-time').textContent).toBe('120s');
      expect(document.getElementById('result-message').textContent).toContain('Bien joué');
    });

    test('devrait redémarrer le quiz', () => {
      mockQuizManager.currentQuiz = global.quizData.general;
      global.quizData = { general: global.quizData.general };

      uiManager.restartQuiz();

      expect(mockQuizManager.startQuiz).toHaveBeenCalledWith('general');
    });
  });

  describe('Partage social', () => {
    beforeEach(() => {
      mockQuizManager.getResults.mockReturnValue({
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        timeElapsed: 120,
        quizTitle: 'Test Quiz'
      });
      global.window = { location: { href: 'http://localhost:8000' } };
    });

    test('devrait partager sur Twitter', () => {
      uiManager.shareOnTwitter();

      expect(global.open).toHaveBeenCalled();
      const url = global.open.mock.calls[0][0];
      expect(url).toContain('twitter.com');
      expect(url).toContain('J\'ai obtenu 8/10');
    });

    test('devrait partager sur Facebook', () => {
      uiManager.shareOnFacebook();

      expect(global.open).toHaveBeenCalled();
      const url = global.open.mock.calls[0][0];
      expect(url).toContain('facebook.com');
    });

    test('devrait partager sur WhatsApp', () => {
      uiManager.shareOnWhatsApp();

      expect(global.open).toHaveBeenCalled();
      const url = global.open.mock.calls[0][0];
      expect(url).toContain('wa.me');
    });

    test('devrait copier dans le presse-papiers', async () => {
      navigator.clipboard.writeText.mockResolvedValue();

      await uiManager.copyToClipboard();

      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Résultat copié dans le presse-papiers!');
    });
  });

  describe('Dashboard', () => {
    test('devrait afficher le dashboard avec les statistiques', () => {
      const mockStats = {
        totalQuizzes: 5,
        averageScore: 75,
        bestScore: 90,
        recentScores: [
          { quizId: 'general', percentage: 80, date: '2024-01-01T00:00:00.000Z' },
          { quizId: 'science', percentage: 70, date: '2024-01-02T00:00:00.000Z' }
        ]
      };

      mockUserManager.getUserStats.mockReturnValue(mockStats);
      global.quizData = {
        general: { title: 'Culture Générale' },
        science: { title: 'Sciences' }
      };

      uiManager.showDashboard();

      expect(document.getElementById('total-quizzes').textContent).toBe('5');
      expect(document.getElementById('average-score').textContent).toBe('75%');
      expect(document.getElementById('best-score').textContent).toBe('90%');

      const scoresList = document.getElementById('scores-list');
      expect(scoresList.children).toHaveLength(2);
    });

    test('devrait gérer le cas où l\'utilisateur n\'est pas connecté', () => {
      mockUserManager.getUserStats.mockReturnValue(null);

      uiManager.showDashboard();

      expect(global.alert).toHaveBeenCalledWith('Veuillez vous connecter pour voir votre dashboard');
    });
  });

  describe('Navigation', () => {
    test('devrait changer d\'écran correctement', () => {
      uiManager.showScreen('question');

      expect(document.querySelector('.screen-question').classList.contains('active')).toBe(true);
      expect(document.querySelector('.screen-auth').classList.contains('active')).toBe(false);
    });
  });
});