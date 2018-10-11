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

const resize = (frame, upcomingPicture) => {
  const newImageSize = {
    width: 0,
    height: 0
  }
  const ratio1 = frame.height / upcomingPicture.height;
  const ratio2 = frame.width / upcomingPicture.width;
  const ratio = Math.min(ratio1, ratio2);
  newImageSize.width = Math.round(upcomingPicture.width * ratio);
  newImageSize.height = Math.round(upcomingPicture.height * ratio);
  return newImageSize;
};

export {createDOMElement, showScreen, resize};

