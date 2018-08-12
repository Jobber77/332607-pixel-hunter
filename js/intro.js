import {createDOMElement} from './util';

const INTRO_PAGE_HTML = `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;

export const introPage = createDOMElement(`section`, `intro`, INTRO_PAGE_HTML);
