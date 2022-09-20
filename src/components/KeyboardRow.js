import Key from "./Key";

const KeyboardRow = ({ letters, keys, onClick }) => {
  return (
    <div className="keyboard-row">
      {keys.map((k) => {
        const letter = letters.find((l) => l.letter === k);
        return (
          <Key
            key={k}
            letter={k}
            correctLetter={letter?.correctLetter}
            correctPosition={letter?.correctPosition}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};

export default KeyboardRow;
