const nextScreen = (currentScreen, screensArray) => {
  if (typeof currentScreen !== `number` || !Array.isArray(screensArray)) {
    throw new Error(`incorrect arguments types`);
  }
  const tempCurrentScreen = currentScreen;
  const tempScreenArray = screensArray.map((item) => item);
  if (!tempScreenArray.some((item) => item === tempCurrentScreen)) {
    throw new Error(`argument value out of range`);
  }
  let nextScreenId = tempScreenArray.indexOf(tempCurrentScreen) + 1;
  nextScreenId = (nextScreenId > tempScreenArray.length - 1) ? 0 : nextScreenId;

  return tempScreenArray[nextScreenId];
};

export {nextScreen};
