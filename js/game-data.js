import typeOne from './game-2';
import typeTwo from './game-1';
import typeThree from './game-3';
import resultScreen from './stats';

const initialGameObject = {
  playerName: ``,
  isWin: false,
  currentQuestion: 0,
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
    timeLeft: 15
  },
  levelResultHistory: [],
  gameScreensRenderers: {
    one: typeOne,
    two: typeTwo,
    three: typeThree,
    result: resultScreen
  }
};

const generateNewGameObject = (playerName) => {
  const newGame = JSON.parse(JSON.stringify(initialGameObject));
  newGame.playerName = playerName;
  newGame.gameScreensRenderers = initialGameObject.gameScreensRenderers;
  return newGame;
};

export {generateNewGameObject};
