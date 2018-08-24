export const gameMainObject = {
  currentQuestion: 1,
  questions: [
    {
      type: ``,
      text: ``,
      answers: [
        {
          imgLink: ``,
          isPicture: false
        }]
    }
  ],
  currentStats: {
    hp: 3,
    timeLeft: 30
  },
  answersHistory: [
    {
      isCorrect: true,
      timeLeft: 0
    }
  ],
  gameScreensRenderers: {
    onePicture: (data) => `awsome screen 1`,
    twoPictures: (data) => `awsome screen 2`,
    threePictures: (data) => `awsome screen 3`,
  }
};

