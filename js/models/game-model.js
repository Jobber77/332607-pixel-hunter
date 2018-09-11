const initialGameObject = {
  playerName: ``,
  isWin: false,
  currentQuestionId: 0,
  questions: [
    {
      type: `two`,
      text: `Угадайте для каждого изображения фото или рисунок?`,
      answers: [
        {
          imgLink: `https://k32.kn3.net/5C7060EC5.jpg`,
          isPainting: true
        },
        {
          imgLink: `https://k42.kn3.net/D2F0370D6.jpg`,
          isPainting: true
        },
      ]
    },
    {
      type: `two`,
      text: `Угадайте для каждого изображения фото или рисунок?`,
      answers: [
        {
          imgLink: `https://k32.kn3.net/5C7060EC5.jpg`,
          isPainting: true
        },
        {
          imgLink: `https://k42.kn3.net/D2F0370D6.jpg`,
          isPainting: true
        },
      ]
    },
    {
      type: `two`,
      text: `Угадайте для каждого изображения фото или рисунок?`,
      answers: [
        {
          imgLink: `https://k32.kn3.net/5C7060EC5.jpg`,
          isPainting: true
        },
        {
          imgLink: `https://k42.kn3.net/D2F0370D6.jpg`,
          isPainting: true
        },
      ]
    },
    {
      type: `one`,
      text: `Угадай, фото или рисунок?`,
      answers: [
        {
          imgLink: `http://i.imgur.com/1KegWPz.jpg`,
          isPainting: false
        }
      ]
    },
    {
      type: `one`,
      text: `Угадай, фото или рисунок?`,
      answers: [
        {
          imgLink: `http://i.imgur.com/1KegWPz.jpg`,
          isPainting: false
        }
      ]
    },
    {
      type: `one`,
      text: `Угадай, фото или рисунок?`,
      answers: [
        {
          imgLink: `http://i.imgur.com/1KegWPz.jpg`,
          isPainting: false
        }
      ]
    },
    {
      type: `three`,
      text: `Найдите рисунок среди изображений`,
      answers: [
        {
          imgLink: `https://i.imgur.com/DiHM5Zb.jpg`,
          isPainting: false
        },
        {
          imgLink: `https://k42.kn3.net/CF42609C8.jpg`,
          isPainting: false
        },
        {
          imgLink: `http://placehold.it/468x458`,
          isPainting: true
        }]
    },
    {
      type: `three`,
      text: `Найдите рисунок среди изображений`,
      answers: [
        {
          imgLink: `https://i.imgur.com/DiHM5Zb.jpg`,
          isPainting: false
        },
        {
          imgLink: `https://k42.kn3.net/CF42609C8.jpg`,
          isPainting: false
        },
        {
          imgLink: `http://placehold.it/468x458`,
          isPainting: true
        }]
    },
    {
      type: `three`,
      text: `Найдите рисунок среди изображений`,
      answers: [
        {
          imgLink: `https://i.imgur.com/DiHM5Zb.jpg`,
          isPainting: false
        },
        {
          imgLink: `https://k42.kn3.net/CF42609C8.jpg`,
          isPainting: false
        },
        {
          imgLink: `http://placehold.it/468x458`,
          isPainting: true
        }]
    },
    {
      type: `three`,
      text: `Найдите рисунок среди изображений`,
      answers: [
        {
          imgLink: `https://i.imgur.com/DiHM5Zb.jpg`,
          isPainting: false
        },
        {
          imgLink: `https://k42.kn3.net/CF42609C8.jpg`,
          isPainting: false
        },
        {
          imgLink: `http://placehold.it/468x458`,
          isPainting: true
        }]
    }
  ],
  currentStats: {
    hp: 3,
    timeLeft: 30
  },
  levelResultHistory: []
};

export default class GameModel {
  constructor(initialGameState) {
    this._gameState = initialGameState;
  }
  get gameState() {
    return this._gameState;
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
  static generateNewGameData() {
    return JSON.parse(JSON.stringify(initialGameObject));
  }
}
