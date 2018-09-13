const initialGameObject = {
  playerName: ``,
  isWin: false,
  currentQuestionId: 0,
  questions: [],
  currentStats: {
    hp: 3,
    timeLeft: 30
  },
  levelResultHistory: []
};

let questionsData;

export default class GameModel {
  constructor(initialGameState) {
    this._gameState = initialGameState;
  }
  get gameState() {
    return this._gameState;
  }
  get hp() {
    return this._gameState.currentStats.hp;
  }
  get currentStats() {
    return this._gameState.currentStats;
  }
  get levelResultHistory() {
    return this._gameState.levelResultHistory;
  }
  get currentQuestionType() {
    return this.currentQuestion.type;
  }
  get currentQuestionId() {
    return this._gameState.currentQuestionId;
  }
  set currentQuestionId(value) {
    this._gameState.currentQuestionId = value;
  }
  get currentQuestion() {
    return this._gameState.questions[this.currentQuestionId];
  }
  get currentQuestionAnswers() {
    return this._gameState.questions[this.currentQuestionId].answers;
  }
  get nextQuestionId() {
    let nextScreenId = this._gameState.currentQuestionId + 1;
    nextScreenId = (nextScreenId > this._gameState.questions.length - 1) ? -1 : nextScreenId;
    return nextScreenId;
  }
  static generateNewGameStateObject() {
    return JSON.parse(JSON.stringify(initialGameObject));
  }

  static saveFetchedQuestionsData(questions) {
    questionsData = questions;
    return questions;
  }
  static getFetchedQuestionsData() {
    return questionsData;
  }
}
