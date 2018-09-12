import {adaptQuestionsData} from './data-adapter';
import Application from './application';

const Endpoints = {
  QUESTIONS_ENDPOINT: `https://es.dump.academy/pixel-hunter/questions`
};

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
      then((data) => Application.saveQuestionsData(adaptQuestionsData(data)));
  }
  static fetchResultsHistory() {

  }

  static uploadCurrentResult() {

  }
}
