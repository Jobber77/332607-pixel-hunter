import {showScreen} from './util';
import IntroPresenter from './intro-presenter';
import GreetingsPresenter from './greetings-presenter';
import RulesPresenter from './rules-presenter';
import GameType1Presenter from './game-type1-presenter';
import GameType2Presenter from './game-type2-presenter';
import GameType3Presenter from './game-type3-presenter';
import StatsPresenter from './stats-presenter';

export default class Application {

  static showIntro() {
    const presenter = new IntroPresenter();
    showScreen(presenter.element);
  }
  static showGreeting() {
    const presenter = new GreetingsPresenter();
    showScreen(presenter.element);
  }
  static showRules() {
    const presenter = new RulesPresenter();
    showScreen(presenter.element);
  }
  static showGame(gameData) {
    const nextQuestionType = gameData.currentQuestionType;
    let presenter;
    switch (nextQuestionType) {
      case `two`:
        presenter = new GameType1Presenter(gameData);
        break;
      case `one`:
        presenter = new GameType2Presenter(gameData);
        break;
      case `three`:
        presenter = new GameType3Presenter(gameData);
        break;
    }
    showScreen(presenter.element);
    presenter.start();
  }

  static showStats(gameData) {
    const presenter = new StatsPresenter(gameData);
    showScreen(presenter.element);
  }

}
