const mainScreen = document.querySelector(`#main`);

const showScreen = (screenToShow) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(screenToShow);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(fragment);
};

const createDOMElement = (type, classes, innerHtml, textContent) => {
  const newElement = document.createElement(type);
  if (Array.isArray(classes)) {
    classes.forEach((element) => newElement.classList.add(element));
  } else if (classes !== `` && classes !== ` `) {
    newElement.classList.add(classes);
  }
  if (textContent) {
    newElement.textContent = textContent;
  }
  newElement.innerHTML = innerHtml;
  return newElement;
};

const converClassListToString = (classArray) => {
  return classArray.map((item) => `.${item}`).join(` `);
};

export {createDOMElement, showScreen, converClassListToString};

