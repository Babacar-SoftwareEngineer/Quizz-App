/**
 * Tests pour UserManager
 */
describe('UserManager', () => {
  let userManager;

  beforeEach(() => {
    // Reset localStorage mock
    localStorage.clear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();

    // Créer une nouvelle instance
    userManager = new UserManager();
  });

  describe('Initialisation', () => {
    test('devrait initialiser sans utilisateur connecté', () => {
      expect(userManager.currentUser).toBeNull();
      expect(userManager.isLoggedIn()).toBe(false);
    });

    test('devrait charger les données utilisateur depuis localStorage', () => {
      const mockUsers = {
        'testuser': {
          email: 'test@example.com',
          password: 'hashedpass',
          scores: [],
          createdAt: '2024-01-01T00:00:00.000Z'
        }
      };
      localStorage.getItem.mockReturnValue(JSON.stringify(mockUsers));

      const newUserManager = new UserManager();
      expect(newUserManager.users).toEqual(mockUsers);
    });
  });

  describe('Inscription', () => {
    test('devrait permettre l\'inscription d\'un nouvel utilisateur', () => {
      const result = userManager.register('testuser', 'test@example.com', 'password123');

      expect(result).toBe(true);
      expect(userManager.users['testuser']).toBeDefined();
      expect(userManager.users['testuser'].email).toBe('test@example.com');
      expect(userManager.users['testuser'].scores).toEqual([]);
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    test('devrait rejeter l\'inscription si l\'utilisateur existe déjà', () => {
      userManager.register('testuser', 'test@example.com', 'password123');

      expect(() => {
        userManager.register('testuser', 'other@example.com', 'password456');
      }).toThrow('Ce nom d\'utilisateur existe déjà');
    });

    test('devrait hasher le mot de passe', () => {
      userManager.register('testuser', 'test@example.com', 'password123');

      const hashedPassword = userManager.users['testuser'].password;
      expect(hashedPassword).not.toBe('password123');
      expect(hashedPassword).toBe(userManager.hashPassword('password123'));
    });
  });

  describe('Connexion', () => {
    beforeEach(() => {
      userManager.register('testuser', 'test@example.com', 'password123');
    });

    test('devrait permettre la connexion avec des identifiants corrects', () => {
      const result = userManager.login('testuser', 'password123');

      expect(result).toBe(true);
      expect(userManager.currentUser).toBe('testuser');
      expect(userManager.isLoggedIn()).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('quizApp_currentUser', 'testuser');
    });

    test('devrait rejeter la connexion avec un nom d\'utilisateur incorrect', () => {
      expect(() => {
        userManager.login('wronguser', 'password123');
      }).toThrow('Nom d\'utilisateur ou mot de passe incorrect');
    });

    test('devrait rejeter la connexion avec un mot de passe incorrect', () => {
      expect(() => {
        userManager.login('testuser', 'wrongpassword');
      }).toThrow('Nom d\'utilisateur ou mot de passe incorrect');
    });
  });

  describe('Déconnexion', () => {
    beforeEach(() => {
      userManager.register('testuser', 'test@example.com', 'password123');
      userManager.login('testuser', 'password123');
    });

    test('devrait déconnecter l\'utilisateur', () => {
      userManager.logout();

      expect(userManager.currentUser).toBeNull();
      expect(userManager.isLoggedIn()).toBe(false);
      expect(localStorage.removeItem).toHaveBeenCalledWith('quizApp_currentUser');
    });
  });

  describe('Sauvegarde des scores', () => {
    beforeEach(() => {
      userManager.register('testuser', 'test@example.com', 'password123');
      userManager.login('testuser', 'password123');
    });

    test('devrait sauvegarder un score', () => {
      userManager.saveScore('general', 8, 10, 120);

      const userData = userManager.getUserData();
      expect(userData.scores).toHaveLength(1);
      expect(userData.scores[0]).toEqual({
        quizId: 'general',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        timeElapsed: 120,
        date: expect.any(String)
      });
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    test('devrait ne pas sauvegarder si l\'utilisateur n\'est pas connecté', () => {
      userManager.logout();
      userManager.saveScore('general', 8, 10, 120);

      expect(userManager.getUserData()).toBeNull();
    });
  });

  describe('Statistiques utilisateur', () => {
    beforeEach(() => {
      userManager.register('testuser', 'test@example.com', 'password123');
      userManager.login('testuser', 'password123');

      // Ajouter quelques scores
      userManager.saveScore('general', 8, 10, 120);
      userManager.saveScore('science', 6, 10, 150);
      userManager.saveScore('histoire', 9, 10, 100);
    });

    test('devrait calculer les statistiques correctement', () => {
      const stats = userManager.getUserStats();

      expect(stats.totalQuizzes).toBe(3);
      expect(stats.averageScore).toBe(77); // (80 + 60 + 90) / 3
      expect(stats.bestScore).toBe(90);
      expect(stats.recentScores).toHaveLength(3);
    });

    test('devrait retourner null si l\'utilisateur n\'est pas connecté', () => {
      userManager.logout();
      const stats = userManager.getUserStats();

      expect(stats).toBeNull();
    });

    test('devrait gérer le cas où il n\'y a pas de scores', () => {
      // Créer un nouvel utilisateur sans scores
      userManager.logout();
      userManager.register('newuser', 'new@example.com', 'password123');
      userManager.login('newuser', 'password123');

      const stats = userManager.getUserStats();

      expect(stats.totalQuizzes).toBe(0);
      expect(stats.averageScore).toBe(0);
      expect(stats.bestScore).toBe(0);
      expect(stats.recentScores).toEqual([]);
    });
  });

  describe('Fonction de hash', () => {
    test('devrait produire un hash cohérent', () => {
      const hash1 = userManager.hashPassword('password123');
      const hash2 = userManager.hashPassword('password123');

      expect(hash1).toBe(hash2);
      expect(hash1).not.toBe('password123');
    });

    test('devrait produire des hash différents pour des mots de passe différents', () => {
      const hash1 = userManager.hashPassword('password123');
      const hash2 = userManager.hashPassword('password456');

      expect(hash1).not.toBe(hash2);
    });
  });
});