export const cleanupLetters = (word, letters) => {
  const wordFacts = analyseWord(word);
  console.log(word);
  return letters.map((l, i) => {
    if (l.correctLetter && l.correctPosition) return l;
    if (!l.correctLetter && !l.correctPosition) return l;

    const letter = wordFacts.find((l2) => l2.letter === l.letter);
    const guessInstances = letters.filter((l2) => l2.letter === l.letter)
      .length;

    if (
      !l.correctPosition &&
      letter.instances.length === 1 &&
      guessInstances === 1
    ) {
      return l;
    }

    if (!l.correctPosition && letter.instances.length > 1) {
      return { ...l, correctPosition: false };
    }

    const hasCorrectPosition = letters.some(
      (l2) => l2.letter === l.letter && l2.correctPosition
    );
    if (hasCorrectPosition) {
      return { ...l, correctPosition: false, correctLetter: false };
    }

    const hasCorrectLetter = letters.some(
      (l2) => l2.letter === l.letter && l2.correctLetter
    );

    const flaggedIncorrect =
      !hasCorrectPosition &&
      guessInstances > 1 &&
      hasCorrectLetter &&
      letters.some((l2, i2) => l2.letter === l.letter && i2 < i);

    if (flaggedIncorrect) {
      return { ...l, correctPosition: false, correctLetter: false };
    }

    return l;
  });
};

export const instancesOf = (word, letter) => {
  const positions = [];

  word.split("").forEach((l, i) => {
    if (l === letter) {
      positions.push(i);
    }
  });

  return positions;
};

export const analyseWord = (selectedWord) =>
  [...new Set(selectedWord.split(""))].map((l, i) => ({
    letter: l,
    instances: instancesOf(selectedWord, l)
  }));

export const validateWord = (word, attempt) => {
  return {
    attempt,
    correct: word === attempt,
    letters: cleanupLetters(
      word,
      attempt.split("").map((l, i) => ({
        letter: l,
        correctLetter: word.indexOf(l) >= 0,
        correctPosition: word.indexOf(l, i) === i
      }))
    )
  };
};

export const isValidWord = (words, attempt) => {
  return words.some((w) => w.toUpperCase() === attempt);
};

export const generateLetters = (letters) => {
  return letters.map((letter) => {
    const correctLetter = letters.some(
      (l) => l.letter === letter.letter && l.correctLetter
    );
    const correctPosition = letters.some(
      (l) => l.letter === letter.letter && l.correctPosition
    );

    return {
      letter: letter.letter,
      correctLetter,
      correctPosition
    };
  });
};
