import {adaptQuestionsData} from './data-adapter';
import GameModel from './models/game-model';

const Endpoints = {
  QUESTIONS_ENDPOINT: `https://es.dump.academy/pixel-hunter/questions`,
  RESULTS_ENDPOINT: `https://es.dump.academy/pixel-hunter/stats/:appId-:username`
};

const APP_ID = 332607;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class GameDataRepository {
  static fetchQuestionsData() {
    return window.fetch(Endpoints.QUESTIONS_ENDPOINT).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => GameModel.saveFetchedQuestionsData(adaptQuestionsData(data)));
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
