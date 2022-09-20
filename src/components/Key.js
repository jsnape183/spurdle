const Key = ({ letter, correctLetter, correctPosition, onClick }) => {
  const generateKeyClass = (letter, correctLetter, correctPosition) => {
    if (correctLetter && correctPosition) {
      return "key correct";
    }

    if (correctLetter && !correctPosition) {
      return "key partial";
    }

    if (correctLetter === false && correctPosition === false) {
      return "key incorrect";
    }

    return "key";
  };

  return (
    <div
      className={generateKeyClass(letter, correctLetter, correctPosition)}
      onClick={() => onClick(letter)}
    >
      {letter}
    </div>
  );
};

export default Key;
