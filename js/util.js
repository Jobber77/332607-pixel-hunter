const createDOMElement = (type, classes, innerHtml, textContent) => {
  const newElement = document.createElement(type);
  if (Array.isArray(classes)) {
    classes.forEach((element) => newElement.classList.add(element));
  } else {
    newElement.classList.add(classes);
  }
  if (textContent) {
    newElement.textContent = textContent;
  }
  newElement.innerHTML = innerHtml;
  return newElement;
};

export {createDOMElement};

