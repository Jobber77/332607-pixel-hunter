'use strict';
(function () {
  function createDOMElement(type, classes, textContent) {
    const newElement = document.createElement(type);
    if (classes.isArray) {
      classes.forEach((element) => newElement.classList.add(element.toString()));
    } else {
      newElement.classList.add(classes);
    }
    if (textContent) {
      newElement.textContent = textContent;
    }
    return newElement;
  }

  window.util = {
    createDOMElement
  };
})();
