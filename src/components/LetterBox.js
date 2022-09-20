const LetterBox = ({ value }) => {
  const generateLetterClass = (letter) => {
    if (typeof letter === "string") {
      return "letter-box";
    }

    if (letter.correctLetter && letter.correctPosition) {
      return "letter-box correct";
    }

    if (letter.correctLetter && !letter.correctPosition) {
      return "letter-box partial";
    }

    return "letter-box incorrect";
  };

  const renderLetter = (letter) => {
    if (typeof letter === "string") {
      return letter;
    }

    return <span>{letter.letter}</span>;
  };

  return (
    <div className={generateLetterClass(value)}>{renderLetter(value)}</div>
  );
};

export default LetterBox;
