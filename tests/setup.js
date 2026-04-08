// Setup pour les tests Jest
// Mock du localStorage pour les tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

// Mock de l'API Clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock de window.open pour les tests de partage social
global.open = jest.fn();

// Mock de alert pour éviter les popups pendant les tests
global.alert = jest.fn();

// Mock de DOM minimal pour les tests
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