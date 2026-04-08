// ====================
// DONNÉES DES QUIZ
// ====================

const quizData = {
    general: {
        title: "Culture Générale",
        description: "Testez vos connaissances générales",
        difficulty: "medium",
        questions: [
            {
                question: "Quel est le plus grand océan du monde?",
                options: ["Océan Atlantique", "Océan Pacifique", "Océan Indien", "Océan Arctique"],
                correct: 1
            },
            {
                question: "En quelle année l'homme a-t-il marché sur la lune?",
                options: ["1965", "1967", "1969", "1971"],
                correct: 2
            },
            {
                question: "Quel est le plus haut sommet du monde?",
                options: ["Kangchenjunga", "Kilimandjaro", "Mont Everest", "Denali"],
                correct: 2
            },
            {
                question: "Quel élément chimique porte le symbole Fe?",
                options: ["Fluor", "Fer", "Français", "Fermium"],
                correct: 1
            },
            {
                question: "Combien de continents y a-t-il?",
                options: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "Quel est le plus long fleuve du monde?",
                options: ["Amazone", "Nil", "Yangzi", "Mississippi"],
                correct: 1
            },
            {
                question: "En quelle année a été inventé l'internet?",
                options: ["1983", "1989", "1995", "2000"],
                correct: 1
            },
            {
                question: "Quel est le plus grand pays du monde par superficie?",
                options: ["Canada", "Chine", "Russie", "États-Unis"],
                correct: 2
            },
            {
                question: "Combien de cordes a une guitare classique?",
                options: ["4", "5", "6", "7"],
                correct: 2
            },
            {
                question: "Quel est le plus rapide animal terrestre?",
                options: ["Antilope", "Guépard", "Autruche", "Gazelle"],
                correct: 1
            }
        ]
    },
    science: {
        title: "Sciences",
        description: "Questions scientifiques passionnantes",
        difficulty: "hard",
        questions: [
            {
                question: "Quelle est la vitesse de la lumière dans le vide?",
                options: ["300 000 km/s", "150 000 km/s", "450 000 km/s", "600 000 km/s"],
                correct: 0
            },
            {
                question: "Quel est le symbole chimique de l'or?",
                options: ["Ag", "Au", "Fe", "Cu"],
                correct: 1
            },
            {
                question: "Combien de planètes y a-t-il dans notre système solaire?",
                options: ["7", "8", "9", "10"],
                correct: 1
            },
            {
                question: "Quelle particule subatomique porte une charge positive?",
                options: ["Neutron", "Électron", "Proton", "Photon"],
                correct: 2
            },
            {
                question: "Quel est l'os le plus long du corps humain?",
                options: ["Humérus", "Fémur", "Tibia", "Radius"],
                correct: 1
            },
            {
                question: "Quelle est la formule chimique de l'eau?",
                options: ["CO2", "H2O", "O2", "NaCl"],
                correct: 1
            },
            {
                question: "Quel scientifique a formulé la théorie de la relativité?",
                options: ["Newton", "Einstein", "Galilée", "Tesla"],
                correct: 1
            },
            {
                question: "Quel est le pH neutre?",
                options: ["0", "7", "14", "1"],
                correct: 1
            },
            {
                question: "Quelle planète est surnommée la 'planète rouge'?",
                options: ["Vénus", "Mars", "Jupiter", "Saturne"],
                correct: 1
            },
            {
                question: "Quel est l'élément le plus abondant dans l'univers?",
                options: ["Oxygène", "Carbone", "Hydrogène", "Hélium"],
                correct: 2
            }
        ]
    },
    histoire: {
        title: "Histoire",
        description: "Voyagez dans le temps avec ces questions historiques",
        difficulty: "medium",
        questions: [
            {
                question: "En quelle année a eu lieu la Révolution française?",
                options: ["1789", "1799", "1776", "1804"],
                correct: 0
            },
            {
                question: "Qui était le premier président des États-Unis?",
                options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
                correct: 1
            },
            {
                question: "Quelle guerre est appelée 'la Grande Guerre'?",
                options: ["Guerre de Sécession", "Première Guerre mondiale", "Seconde Guerre mondiale", "Guerre Froide"],
                correct: 1
            },
            {
                question: "Quel empire a construit les pyramides de Gizeh?",
                options: ["Grec", "Romain", "Égyptien", "Maya"],
                correct: 2
            },
            {
                question: "En quelle année Christophe Colomb a-t-il découvert l'Amérique?",
                options: ["1492", "1500", "1485", "1510"],
                correct: 0
            },
            {
                question: "Quel traité a mis fin à la Première Guerre mondiale?",
                options: ["Traité de Versailles", "Traité de Paris", "Traité de Vienne", "Traité de Westphalie"],
                correct: 0
            },
            {
                question: "Qui était le roi de France pendant la Révolution?",
                options: ["Louis XIV", "Louis XV", "Louis XVI", "Napoléon"],
                correct: 2
            },
            {
                question: "Quelle civilisation a inventé l'écriture cunéiforme?",
                options: ["Égyptienne", "Sumérienne", "Chinoise", "Indienne"],
                correct: 1
            },
            {
                question: "En quelle année a eu lieu la chute du mur de Berlin?",
                options: ["1987", "1989", "1991", "1993"],
                correct: 1
            },
            {
                question: "Quel explorateur a été le premier à faire le tour du monde?",
                options: ["Vasco de Gama", "Ferdinand Magellan", "Jacques Cartier", "Christophe Colomb"],
                correct: 1
            }
        ]
    },
    sport: {
        title: "Sport",
        description: "Questions sur le monde du sport",
        difficulty: "easy",
        questions: [
            {
                question: "Combien de joueurs y a-t-il dans une équipe de football?",
                options: ["9", "10", "11", "12"],
                correct: 2
            },
            {
                question: "Quel pays a remporté la Coupe du Monde 2018?",
                options: ["Brésil", "Allemagne", "France", "Argentine"],
                correct: 2
            },
            {
                question: "Combien de points vaut un panier à 3 points au basketball?",
                options: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "Quel est le sport national du Japon?",
                options: ["Sumo", "Judo", "Kendo", "Karate"],
                correct: 1
            },
            {
                question: "Combien de sets faut-il gagner pour remporter un match de tennis?",
                options: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "Quel nageur détient le record du monde du 100m nage libre?",
                options: ["Michael Phelps", "Ian Thorpe", "David Popovici", "Caeleb Dressel"],
                correct: 2
            },
            {
                question: "Dans quel sport utilise-t-on un club appelé 'driver'?",
                options: ["Tennis", "Golf", "Baseball", "Cricket"],
                correct: 1
            },
            {
                question: "Combien de médailles d'or Usain Bolt a-t-il remporté aux JO 2008?",
                options: ["1", "2", "3", "4"],
                correct: 2
            },
            {
                question: "Quel est le plus grand stade du monde?",
                options: ["Wembley", "Camp Nou", "Maracanã", "Rungrado May Day"],
                correct: 3
            },
            {
                question: "Dans quel sport pratique-t-on le 'half-pipe'?",
                options: ["Snowboard", "Ski alpin", "Patinage artistique", "Moto-cross"],
                correct: 0
            }
        ]
    }
};

// ====================
// GESTION DES UTILISATEURS
// ====================

class UserManager {
    constructor() {
        this.currentUser = null;
        this.loadUserData();
    }

    loadUserData() {
        const userData = localStorage.getItem('quizApp_users');
        this.users = userData ? JSON.parse(userData) : {};
    }

    saveUserData() {
        localStorage.setItem('quizApp_users', JSON.stringify(this.users));
    }

    register(username, email, password) {
        if (this.users[username]) {
            throw new Error('Ce nom d\'utilisateur existe déjà');
        }

        this.users[username] = {
            email,
            password: this.hashPassword(password),
            scores: [],
            createdAt: new Date().toISOString()
        };

        this.saveUserData();
        return true;
    }

    login(username, password) {
        const user = this.users[username];
        if (!user || user.password !== this.hashPassword(password)) {
            throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
        }

        this.currentUser = username;
        localStorage.setItem('quizApp_currentUser', username);
        return true;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('quizApp_currentUser');
    }

    isLoggedIn() {
        if (!this.currentUser) {
            this.currentUser = localStorage.getItem('quizApp_currentUser');
        }
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserData() {
        return this.users[this.currentUser] || null;
    }

    saveScore(quizId, score, totalQuestions, timeElapsed) {
        if (!this.isLoggedIn()) return;

        const user = this.users[this.currentUser];
        const scoreEntry = {
            quizId,
            score,
            totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            timeElapsed,
            date: new Date().toISOString()
        };

        user.scores.push(scoreEntry);
        this.saveUserData();
    }

    getUserStats() {
        if (!this.isLoggedIn()) return null;

        const user = this.users[this.currentUser];
        const scores = user.scores;

        if (scores.length === 0) {
            return {
                totalQuizzes: 0,
                averageScore: 0,
                bestScore: 0,
                recentScores: []
            };
        }

        const totalQuizzes = scores.length;
        const averageScore = Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / totalQuizzes);
        const bestScore = Math.max(...scores.map(s => s.percentage));
        const recentScores = scores.slice(-5).reverse();

        return {
            totalQuizzes,
            averageScore,
            bestScore,
            recentScores
        };
    }

    hashPassword(password) {
        // Hash simple pour la démo (en production, utiliser bcrypt)
        return btoa(password + 'quizAppSalt');
    }
}

// ====================
// GESTION DU QUIZ
// ====================

class QuizManager {
    constructor(userManager) {
        this.userManager = userManager;
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.startTime = 0;
        this.selectedAnswer = null;
        this.answered = false;
    }

    startQuiz(quizId) {
        this.currentQuiz = quizData[quizId];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.answered = false;
        this.startTime = Date.now();
    }

    getCurrentQuestion() {
        if (!this.currentQuiz || this.currentQuestionIndex >= this.currentQuiz.questions.length) {
            return null;
        }
        return this.currentQuiz.questions[this.currentQuestionIndex];
    }

    selectAnswer(answerIndex) {
        if (this.answered) return false;

        this.selectedAnswer = answerIndex;
        this.answered = true;

        const question = this.getCurrentQuestion();
        if (answerIndex === question.correct) {
            this.score++;
        }

        return answerIndex === question.correct;
    }

    nextQuestion() {
        if (!this.answered) return false;

        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.answered = false;

        return this.currentQuestionIndex < this.currentQuiz.questions.length;
    }

    getResults() {
        const endTime = Date.now();
        const timeElapsed = Math.floor((endTime - this.startTime) / 1000);
        const percentage = Math.round((this.score / this.currentQuiz.questions.length) * 100);

        return {
            score: this.score,
            totalQuestions: this.currentQuiz.questions.length,
            percentage,
            timeElapsed,
            quizTitle: this.currentQuiz.title
        };
    }

    saveScore() {
        if (this.userManager.isLoggedIn()) {
            const results = this.getResults();
            this.userManager.saveScore(
                Object.keys(quizData).find(key => quizData[key] === this.currentQuiz),
                results.score,
                results.totalQuestions,
                results.timeElapsed
            );
        }
    }
}

// ====================
// GESTION DE L'INTERFACE
// ====================

class UIManager {
    constructor(userManager, quizManager) {
        this.userManager = userManager;
        this.quizManager = quizManager;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showInitialScreen();
    }

    bindEvents() {
        // Authentification
        document.getElementById('btn-login').addEventListener('click', () => this.handleLogin());
        document.getElementById('btn-register').addEventListener('click', () => this.handleRegister());
        document.getElementById('btn-guest').addEventListener('click', () => this.continueAsGuest());
        document.getElementById('show-register').addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm();
        });
        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });
        document.getElementById('btn-logout').addEventListener('click', () => this.handleLogout());

        // Sélection de quiz
        document.getElementById('btn-start').addEventListener('click', () => this.startQuiz());
        document.getElementById('btn-back-to-select').addEventListener('click', () => this.showQuizSelect());

        // Quiz
        document.getElementById('btn-next').addEventListener('click', () => this.nextQuestion());

        // Résultats
        document.getElementById('btn-restart').addEventListener('click', () => this.restartQuiz());
        document.getElementById('btn-back-to-select').addEventListener('click', () => this.showQuizSelect());

        // Partage social
        document.getElementById('share-twitter').addEventListener('click', () => this.shareOnTwitter());
        document.getElementById('share-facebook').addEventListener('click', () => this.shareOnFacebook());
        document.getElementById('share-whatsapp').addEventListener('click', () => this.shareOnWhatsApp());
        document.getElementById('share-copy').addEventListener('click', () => this.copyToClipboard());

        // Dashboard
        document.getElementById('btn-dashboard-back').addEventListener('click', () => this.showQuizSelect());
    }

    showInitialScreen() {
        if (this.userManager.isLoggedIn()) {
            this.showQuizSelect();
        } else {
            this.showScreen('auth');
        }
    }

    showScreen(screenName) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));

        const targetScreen = document.querySelector(`.screen-${screenName}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    // Authentification
    showRegisterForm() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    }

    showLoginForm() {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }

    handleLogin() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            this.userManager.login(username, password);
            this.showQuizSelect();
        } catch (error) {
            alert(error.message);
        }
    }

    handleRegister() {
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            this.userManager.register(username, email, password);
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            this.showLoginForm();
        } catch (error) {
            alert(error.message);
        }
    }

    continueAsGuest() {
        this.showQuizSelect();
    }

    handleLogout() {
        this.userManager.logout();
        this.showInitialScreen();
    }

    // Sélection de quiz
    showQuizSelect() {
        this.renderQuizGrid();
        this.updateUserInfo();
        this.showScreen('quiz-select');
    }

    renderQuizGrid() {
        const grid = document.getElementById('quiz-grid');
        grid.innerHTML = '';

        Object.keys(quizData).forEach(quizId => {
            const quiz = quizData[quizId];
            const card = document.createElement('div');
            card.className = 'quiz-card';
            card.onclick = () => this.selectQuiz(quizId);

            card.innerHTML = `
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <span class="difficulty ${quiz.difficulty}">${quiz.difficulty}</span>
            `;

            grid.appendChild(card);
        });
    }

    updateUserInfo() {
        const userInfo = document.getElementById('user-info');
        const currentUser = document.getElementById('current-user');

        if (this.userManager.isLoggedIn()) {
            currentUser.textContent = this.userManager.getCurrentUser();
            userInfo.style.display = 'flex';
        } else {
            currentUser.textContent = 'Invité';
            userInfo.style.display = 'none';
        }
    }

    selectQuiz(quizId) {
        this.quizManager.startQuiz(quizId);
        this.displayQuestion();
        this.showScreen('question');
    }

    // Quiz
    displayQuestion() {
        const question = this.quizManager.getCurrentQuestion();
        if (!question) {
            this.showResults();
            return;
        }

        document.getElementById('question-number').textContent =
            `Question ${this.quizManager.currentQuestionIndex + 1}/${this.quizManager.currentQuiz.questions.length}`;
        document.getElementById('question-text').textContent = question.question;

        this.updateProgressBar();

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index, button));
            optionsContainer.appendChild(button);
        });

        document.getElementById('btn-next').disabled = true;
    }

    updateProgressBar() {
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressBar.appendChild(progressFill);
            document.querySelector('.screen-question').insertBefore(progressBar, document.getElementById('question-number'));
        }

        const progressFill = progressBar.querySelector('.progress-fill');
        const progress = ((this.quizManager.currentQuestionIndex) / this.quizManager.currentQuiz.questions.length) * 100;
        progressFill.style.width = progress + '%';
    }

    selectAnswer(index, button) {
        if (this.quizManager.answered) return;

        const isCorrect = this.quizManager.selectAnswer(index);
        const buttons = document.querySelectorAll('.option-button');
        const question = this.quizManager.getCurrentQuestion();

        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === question.correct) {
                btn.classList.add('correct');
            } else if (idx === index && idx !== question.correct) {
                btn.classList.add('incorrect');
            }
        });

        document.getElementById('btn-next').disabled = false;
    }

    nextQuestion() {
        if (this.quizManager.nextQuestion()) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    // Résultats
    showResults() {
        const results = this.quizManager.getResults();

        document.getElementById('result-score').textContent = results.score;
        document.getElementById('result-total').textContent = results.totalQuestions;
        document.getElementById('result-time').textContent = results.timeElapsed + 's';

        const percentage = results.percentage;
        let message = '';

        if (percentage === 100) {
            message = '🎉 Parfait! Score parfait!';
        } else if (percentage >= 80) {
            message = '🌟 Excellentes performances!';
        } else if (percentage >= 60) {
            message = '👍 Bien joué! Vous pouvez faire mieux!';
        } else if (percentage >= 40) {
            message = '📚 Continue d\'apprendre!';
        } else {
            message = '💪 Réessaye et progresse!';
        }

        document.getElementById('result-message').textContent = message;

        // Sauvegarder le score
        this.quizManager.saveScore();

        this.showScreen('result');
    }

    restartQuiz() {
        const currentQuizId = Object.keys(quizData).find(key => quizData[key] === this.quizManager.currentQuiz);
        this.quizManager.startQuiz(currentQuizId);
        this.displayQuestion();
        this.showScreen('question');
    }

    // Partage social
    shareOnTwitter() {
        const results = this.quizManager.getResults();
        const text = `J'ai obtenu ${results.score}/${results.totalQuestions} (${results.percentage}%) au quiz "${results.quizTitle}" sur QuizApp! 🎯`;
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
        window.open(shareUrl, '_blank');
    }

    shareOnFacebook() {
        const results = this.quizManager.getResults();
        const text = `J'ai obtenu ${results.score}/${results.totalQuestions} (${results.percentage}%) au quiz "${results.quizTitle}" sur QuizApp!`;
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
    }

    shareOnWhatsApp() {
        const results = this.quizManager.getResults();
        const text = `J'ai obtenu ${results.score}/${results.totalQuestions} (${results.percentage}%) au quiz "${results.quizTitle}" sur QuizApp! 🎯`;
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
        window.open(shareUrl, '_blank');
    }

    copyToClipboard() {
        const results = this.quizManager.getResults();
        const text = `J'ai obtenu ${results.score}/${results.totalQuestions} (${results.percentage}%) au quiz "${results.quizTitle}" sur QuizApp! 🎯 ${window.location.href}`;

        navigator.clipboard.writeText(text).then(() => {
            alert('Résultat copié dans le presse-papiers!');
        }).catch(() => {
            // Fallback pour les navigateurs qui ne supportent pas clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Résultat copié dans le presse-papiers!');
        });
    }

    // Dashboard
    showDashboard() {
        const stats = this.userManager.getUserStats();
        if (!stats) {
            alert('Veuillez vous connecter pour voir votre dashboard');
            return;
        }

        document.getElementById('total-quizzes').textContent = stats.totalQuizzes;
        document.getElementById('average-score').textContent = stats.averageScore + '%';
        document.getElementById('best-score').textContent = stats.bestScore + '%';

        this.renderRecentScores(stats.recentScores);
        this.showScreen('dashboard');
    }

    renderRecentScores(scores) {
        const scoresList = document.getElementById('scores-list');
        scoresList.innerHTML = '';

        if (scores.length === 0) {
            scoresList.innerHTML = '<p style="text-align: center; color: #666;">Aucun score enregistré</p>';
            return;
        }

        scores.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.className = 'score-item';

            const quizName = quizData[score.quizId]?.title || score.quizId;
            const date = new Date(score.date).toLocaleDateString('fr-FR');

            scoreItem.innerHTML = `
                <div>
                    <div class="quiz-name">${quizName}</div>
                    <div class="date">${date}</div>
                </div>
                <div class="score">${score.percentage}%</div>
            `;

            scoresList.appendChild(scoreItem);
        });
    }

    startQuiz() {
        this.displayQuestion();
        this.showScreen('question');
    }
}

// ====================
// INITIALISATION
// ====================

document.addEventListener('DOMContentLoaded', () => {
    const userManager = new UserManager();
    const quizManager = new QuizManager(userManager);
    const uiManager = new UIManager(userManager, quizManager);

    // Ajouter un bouton dashboard dans la sélection de quiz
    const quizSelectScreen = document.querySelector('.screen-quiz-select');
    const subtitle = quizSelectScreen.querySelector('.app-subtitle');

    if (userManager.isLoggedIn()) {
        const dashboardBtn = document.createElement('button');
        dashboardBtn.className = 'app-button';
        dashboardBtn.textContent = '📊 Mon Dashboard';
        dashboardBtn.style.marginTop = '20px';
        dashboardBtn.onclick = () => uiManager.showDashboard();
        subtitle.parentNode.insertBefore(dashboardBtn, subtitle.nextSibling);
    }
});