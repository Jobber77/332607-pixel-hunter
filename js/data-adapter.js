const Server2AppTypeMapper = {
  'two-of-two': `two`,
  'tinder-like': `one`,
  'one-of-three': `three`,
};

const QuestionTranslationMapper = {
  'Найдите рисунок среди изображений': `Find painting among images`,
  'Найдите фото среди изображений': `Find photo among images`,
  'Угадай, фото или рисунок?': `Guess: photo or painting?`,
  'Угадайте для каждого изображения фото или рисунок?': `Guess for each image: photo or painting?`,
};

const preprocessAnswers = (answers) => answers.map((answer) => {
  const imgLink = answer.image.url;
  const isPainting = answer.type === `painting`;
  return {
    imgLink,
    isPainting,
  };
});

export const adaptQuestionsData = (serverData) => {
  const adaptedQuestions = [];
  for (const question of Object.values(serverData)) {
    const type = Server2AppTypeMapper[question.type];
    const text = QuestionTranslationMapper[question.question];
    const answers = preprocessAnswers(question.answers);
    adaptedQuestions.push({type, text, answers});
  }
  return adaptedQuestions;
};
