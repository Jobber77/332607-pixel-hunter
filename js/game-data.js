const initialGameObject = {
  playerName: ``,
  currentQuestion: 0,
  questions: [
    {
      type: ``,
      text: ``,
      answers: [
        {
          imgLink: `http://placehold.it/468x458`,
          isPicture: false
        },
        {
          imgLink: `http://placehold.it/468x458`,
          isPicture: true
        },
        {
          imgLink: `http://placehold.it/468x458`,
          isPicture: true
        }]
    }
  ],
  currentStats: {
    hp: 3,
    timeLeft: 15
  },
  answersHistory: [
    {
      isCorrect: true,
      timeLeft: 0
    }
  ],
  gameScreensRenderers: {
    onePicture: () => `awsome screen 1`,
    twoPictures: () => `awsome screen 2`,
    threePictures: () => `awsome screen 3`,
  }
};

const generateNewGameObject = (playerName) => {
  return Object.assign({}, initialGameObject, {playerName});
};

export {generateNewGameObject};
