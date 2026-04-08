/**
 * Gestionnaire d'utilisateurs avec sécurité améliorée
 */
class UserManager {
  constructor() {
    this.currentUser = null;
    this.users = {};
    this.loadUserData();
  }

  loadUserData() {
    try {
      const userData = SecureStorage.getItem('quizApp_users');
      this.users = userData || {};

      // Restaurer l'utilisateur connecté
      const currentUserId = SecureStorage.getItem('quizApp_currentUser');
      if (currentUserId && this.users[currentUserId]) {
        this.currentUser = currentUserId;
      }
    } catch (error) {
      ErrorHandler.handle(error, 'UserManager.loadUserData');
      this.users = {};
    }
  }

  saveUserData() {
    try {
      SecureStorage.setItem('quizApp_users', this.users);
    } catch (error) {
      ErrorHandler.handle(error, 'UserManager.saveUserData');
      throw new Error('Impossible de sauvegarder les données utilisateur');
    }
  }

  register(username, email, password) {
    try {
      // Validation des entrées
      const cleanUsername = ValidationUtils.sanitizeInput(username);
      const cleanEmail = ValidationUtils.sanitizeInput(email);

      if (!ValidationUtils.validateUsername(cleanUsername)) {
        throw new Error('Nom d\'utilisateur invalide (3-20 caractères)');
      }

      if (!ValidationUtils.validateEmail(cleanEmail)) {
        throw new Error('Adresse email invalide');
      }

      if (!ValidationUtils.validatePassword(password)) {
        throw new Error('Mot de passe trop faible (minimum 6 caractères)');
      }

      if (this.users[cleanUsername]) {
        throw new Error('Ce nom d\'utilisateur existe déjà');
      }

      // Créer l'utilisateur
      this.users[cleanUsername] = {
        email: cleanEmail,
        password: this.hashPassword(password),
        scores: [],
        createdAt: new Date().toISOString(),
        lastLogin: null,
        preferences: {
          theme: 'light',
          notifications: true
        }
      };

      this.saveUserData();
      Analytics.trackUserAction('user_register', { username: cleanUsername });

      return true;
    } catch (error) {
      Analytics.trackError(error, 'UserManager.register');
      throw error;
    }
  }

  login(username, password) {
    try {
      const cleanUsername = ValidationUtils.sanitizeInput(username);

      if (!cleanUsername || !password) {
        throw new Error('Nom d\'utilisateur et mot de passe requis');
      }

      const user = this.users[cleanUsername];
      if (!user || user.password !== this.hashPassword(password)) {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
      }

      // Mettre à jour la dernière connexion
      user.lastLogin = new Date().toISOString();
      this.saveUserData();

      this.currentUser = cleanUsername;
      SecureStorage.setItem('quizApp_currentUser', cleanUsername);

      Analytics.trackUserAction('user_login', { username: cleanUsername });

      return true;
    } catch (error) {
      Analytics.trackError(error, 'UserManager.login');
      throw error;
    }
  }

  logout() {
    try {
      Analytics.trackUserAction('user_logout', { username: this.currentUser });
      this.currentUser = null;
      SecureStorage.removeItem('quizApp_currentUser');
    } catch (error) {
      ErrorHandler.handle(error, 'UserManager.logout');
    }
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUserData() {
    if (!this.isLoggedIn()) {
      return null;
    }
    return { ...this.users[this.currentUser] };
  }

  updateUserPreferences(preferences) {
    if (!this.isLoggedIn()) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const user = this.users[this.currentUser];
      user.preferences = { ...user.preferences, ...preferences };
      this.saveUserData();

      Analytics.trackUserAction('user_preferences_update', { preferences });
    } catch (error) {
      Analytics.trackError(error, 'UserManager.updateUserPreferences');
      throw error;
    }
  }

  saveScore(quizId, score, totalQuestions, timeElapsed) {
    if (!this.isLoggedIn()) {
      return false;
    }

    try {
      const user = this.users[this.currentUser];
      const scoreEntry = {
        quizId,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        timeElapsed,
        date: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      user.scores.push(scoreEntry);
      this.saveUserData();

      Analytics.trackQuizComplete(quizId, score, totalQuestions, timeElapsed);

      return true;
    } catch (error) {
      Analytics.trackError(error, 'UserManager.saveScore');
      return false;
    }
  }

  getUserStats() {
    if (!this.isLoggedIn()) {
      return null;
    }

    try {
      const user = this.users[this.currentUser];
      const scores = user.scores;

      if (scores.length === 0) {
        return {
          totalQuizzes: 0,
          averageScore: 0,
          bestScore: 0,
          recentScores: [],
          totalTimeSpent: 0,
          favoriteQuiz: null
        };
      }

      const totalQuizzes = scores.length;
      const averageScore = Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / totalQuizzes);
      const bestScore = Math.max(...scores.map(s => s.percentage));
      const totalTimeSpent = scores.reduce((sum, s) => sum + s.timeElapsed, 0);
      const recentScores = scores.slice(-10).reverse(); // Derniers 10 scores

      // Trouver le quiz préféré
      const quizCounts = {};
      scores.forEach(score => {
        quizCounts[score.quizId] = (quizCounts[score.quizId] || 0) + 1;
      });
      const favoriteQuiz = Object.keys(quizCounts).reduce((a, b) =>
        quizCounts[a] > quizCounts[b] ? a : b, null
      );

      return {
        totalQuizzes,
        averageScore,
        bestScore,
        recentScores,
        totalTimeSpent,
        favoriteQuiz
      };
    } catch (error) {
      Analytics.trackError(error, 'UserManager.getUserStats');
      return null;
    }
  }

  deleteAccount() {
    if (!this.isLoggedIn()) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const username = this.currentUser;
      delete this.users[username];
      this.saveUserData();
      this.logout();

      Analytics.trackUserAction('user_account_deleted', { username });

      return true;
    } catch (error) {
      Analytics.trackError(error, 'UserManager.deleteAccount');
      throw error;
    }
  }

  hashPassword(password) {
    // Hash simple pour la démo (en production, utiliser bcrypt ou similaire)
    try {
      return btoa(password + 'quizAppSalt2024!');
    } catch (error) {
      ErrorHandler.handle(error, 'UserManager.hashPassword');
      return password; // Fallback
    }
  }

  // Méthodes utilitaires pour les tests
  _getAllUsers() {
    return { ...this.users };
  }

  _clearAllData() {
    this.users = {};
    this.currentUser = null;
    SecureStorage.clear();
  }
}