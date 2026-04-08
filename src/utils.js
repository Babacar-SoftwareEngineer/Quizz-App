/**
 * Module de validation pour l'application Quiz
 */
class ValidationUtils {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password) {
    return password && password.length >= 6;
  }

  static validateUsername(username) {
    return username && username.length >= 3 && username.length <= 20;
  }

  static sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
  }

  static validateQuizData(quizData) {
    if (!quizData || typeof quizData !== 'object') {
      throw new Error('Données de quiz invalides');
    }

    for (const [quizId, quiz] of Object.entries(quizData)) {
      if (!quiz.title || !quiz.questions || !Array.isArray(quiz.questions)) {
        throw new Error(`Quiz ${quizId} : structure invalide`);
      }

      quiz.questions.forEach((question, index) => {
        if (!question.question || !question.options || !Array.isArray(question.options) || question.options.length < 2) {
          throw new Error(`Quiz ${quizId}, question ${index} : structure invalide`);
        }

        if (typeof question.correct !== 'number' || question.correct < 0 || question.correct >= question.options.length) {
          throw new Error(`Quiz ${quizId}, question ${index} : index de réponse correct invalide`);
        }
      });
    }

    return true;
  }
}

/**
 * Module de gestion des erreurs
 */
class ErrorHandler {
  static handle(error, context = '') {
    console.error(`Erreur dans ${context}:`, error);

    // En développement, afficher plus de détails
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', error.stack);
    }

    // Retourner un message d'erreur user-friendly
    return this.getUserFriendlyMessage(error);
  }

  static getUserFriendlyMessage(error) {
    const errorMessages = {
      'Ce nom d\'utilisateur existe déjà': 'Ce nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.',
      'Nom d\'utilisateur ou mot de passe incorrect': 'Identifiants incorrects. Vérifiez votre nom d\'utilisateur et mot de passe.',
      'Données de quiz invalides': 'Erreur de chargement des quiz. Veuillez recharger la page.',
      'Quiz non trouvé': 'Le quiz demandé n\'existe pas.',
      'Utilisateur non connecté': 'Veuillez vous connecter pour accéder à cette fonctionnalité.'
    };

    return errorMessages[error.message] || 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  }
}

/**
 * Module de stockage local sécurisé
 */
class SecureStorage {
  static setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      ErrorHandler.handle(error, 'SecureStorage.setItem');
      return false;
    }
  }

  static getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      ErrorHandler.handle(error, 'SecureStorage.getItem');
      return null;
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      ErrorHandler.handle(error, 'SecureStorage.removeItem');
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      ErrorHandler.handle(error, 'SecureStorage.clear');
      return false;
    }
  }
}

/**
 * Module de statistiques et analytics
 */
class Analytics {
  static trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: data,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // En développement, logger dans la console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Ici on pourrait envoyer à un service d'analytics
    // this.sendToAnalyticsService(event);
  }

  static trackQuizStart(quizId) {
    this.trackEvent('quiz_start', { quizId });
  }

  static trackQuizComplete(quizId, score, totalQuestions, timeElapsed) {
    this.trackEvent('quiz_complete', {
      quizId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      timeElapsed
    });
  }

  static trackUserAction(action, details = {}) {
    this.trackEvent('user_action', { action, ...details });
  }

  static trackError(error, context) {
    this.trackEvent('error', {
      message: error.message,
      context,
      stack: error.stack
    });
  }
}

// Exports pour les tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ValidationUtils, ErrorHandler, SecureStorage, Analytics };
}