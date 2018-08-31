import {showScreen} from './util';
import IntroView from './views/intro-view';
import buildnextScreen from './greeting';

let view;

const onNextScreenCall = () => {
  view.removeListeners();
  buildnextScreen();
};

export default () => {
  view = new IntroView();
  view.onNextScreenCall = onNextScreenCall;
  showScreen(view.element);
  return view.element;
};

