import {showScreen} from './util';
import buildNextScreen from './rules';
import GreetingsView from './views/greetings-view';

let view;

const onNextScreenCall = () => {
  view.removeListeners();
  buildNextScreen();
};

export default () => {
  view = new GreetingsView();
  view.onNextScreenCall = onNextScreenCall;
  showScreen(view.element);
  return view.element;
};
