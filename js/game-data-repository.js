import {adaptQuestionsData} from './data-adapter';
import GameModel from './models/game-model';
import Application from './application';

const Endpoints = {
  QUESTIONS_ENDPOINT: `https://es.dump.academy/pixel-hunter/questions`,
  RESULTS_ENDPOINT: `https://es.dump.academy/pixel-hunter/stats/:appId-:username`
};

const APP_ID = 332607;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const loadImage = (answer) => {
  return new Promise(() => {
    const image = new Image();
    image.onerror = () => Application.showError(new Error(`Не удалось загрузить картнку: ${answer}`));
    image.src = answer.imgLink;
    image.addEventListener(`load`, () => {
      answer.height = image.height;
      answer.width = image.width;
    })
  });
};

const makeSureImgDownloaded = (data) => {
  let images = data.map((question) => question.answers.map((answer) => answer));
  images = images.reduce((a, b) => a.concat(b), []);
  const dataToWait = images.map((item) => loadImage(item));
  return Promise.all(dataToWait);
};

export default class GameDataRepository {
  static fetchQuestionsData() {
    return window.fetch(Endpoints.QUESTIONS_ENDPOINT).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => GameModel.saveFetchedQuestionsData(adaptQuestionsData(data))).
      then((data) => makeSureImgDownloaded(data));
  }
  static fetchResultsHistory(playerName) {
    return fetch(`${Endpoints.RESULTS_ENDPOINT}${APP_ID}-${playerName}`).then(checkStatus).then((res) => res.json());
  }

  static uploadCurrentResult(currentResult, playerName) {
    currentResult = Object.assign({playerName}, currentResult);
    const requestSettings = {
      body: JSON.stringify(currentResult),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${Endpoints.RESULTS_ENDPOINT}${APP_ID}-${playerName}`, requestSettings).then(checkStatus);
  }
}
