import LetterBox from "./LetterBox";

const LetterRow = ({ values }) => {
  return (
    <div className="row">
      {typeof values === "string" &&
        values
          .split("")
          .map((v, i) => <LetterBox key={`empty_${i}`} value={v} />)}
      {typeof values !== "string" &&
        values.letters.map((l, i) => (
          <LetterBox key={`${l.letter}_${i}`} value={l} />
        ))}
    </div>
  );
};

export default LetterRow;
