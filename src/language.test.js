import { validateWord } from "./language";

describe('When word is "THEIR"', () => {
  const word = "THEIR";

  test('Attempt "EVERY" only marks the second e as correct and the first e as incorrect', () => {
    const validation = validateWord(word, "EVERY");

    expect(validation.letters[0].correctPosition).toBe(false);
    expect(validation.letters[0].correctLetter).toBe(false);
    expect(validation.letters[2].correctPosition).toBe(true);
    expect(validation.letters[2].correctLetter).toBe(true);
  });

  test('Attempt "EVERY" only marks the first e as correct position and the second e as incorrect', () => {
    console.log("Problem child");
    const validation = validateWord(word, "EERIE");
    console.log("End of problem child");
    expect(validation.letters[0].correctPosition).toBe(false);
    expect(validation.letters[0].correctLetter).toBe(true);
    expect(validation.letters[1].correctPosition).toBe(false);
    expect(validation.letters[1].correctLetter).toBe(false);
  });
});

describe('When word is "THERE"', () => {
  const word = "THERE";

  test('Attempt "EVERY" marks the second e as correct and the first e as partial', () => {
    const validation = validateWord(word, "EVERY");

    expect(validation.letters[0].correctPosition).toBe(false);
    expect(validation.letters[0].correctLetter).toBe(true);
    expect(validation.letters[2].correctPosition).toBe(true);
  });
});

describe('When word is "WORDS"', () => {
  const word = "WORDS";

  test('attempt "AIIEU" marks all letters incorrectly', () => {
    const validation = validateWord(word, "AIIEU");
    expect(validation.letters.some((l) => l.correctPosition)).toBe(false);
    expect(validation.letters.some((l) => l.correctLetter)).toBe(false);
  });

  test('attempt "ADIEU" marks D as correct letter', () => {
    const validation = validateWord(word, "ADIEU");
    expect(validation.letters[1].correctPosition).toBe(false);
    expect(validation.letters[1].correctLetter).toBe(true);
  });

  test('attempt "WORMS" marks W, O, R and S correctly', () => {
    const validation = validateWord(word, "WORMS");
    expect(validation.letters[0].correctPosition).toBe(true);
    expect(validation.letters[0].correctLetter).toBe(true);
    expect(validation.letters[1].correctPosition).toBe(true);
    expect(validation.letters[1].correctLetter).toBe(true);
    expect(validation.letters[2].correctPosition).toBe(true);
    expect(validation.letters[2].correctLetter).toBe(true);
    expect(validation.letters[3].correctPosition).toBe(false);
    expect(validation.letters[3].correctLetter).toBe(false);
    expect(validation.letters[4].correctPosition).toBe(true);
    expect(validation.letters[4].correctLetter).toBe(true);
  });

  test('attempt "WORDS" marks all letters correctly', () => {
    const validation = validateWord(word, "WORDS");
    expect(validation.letters[0].correctPosition).toBe(true);
    expect(validation.letters[0].correctLetter).toBe(true);
    expect(validation.letters[1].correctPosition).toBe(true);
    expect(validation.letters[1].correctLetter).toBe(true);
    expect(validation.letters[2].correctPosition).toBe(true);
    expect(validation.letters[2].correctLetter).toBe(true);
    expect(validation.letters[3].correctPosition).toBe(true);
    expect(validation.letters[3].correctLetter).toBe(true);
    expect(validation.letters[4].correctPosition).toBe(true);
    expect(validation.letters[4].correctLetter).toBe(true);
  });
});
