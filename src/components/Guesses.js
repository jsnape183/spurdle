import LetterRow from "./LetterRow";

const Guesses = ({ guesses }) => {
  //console.log(guesses.concat(Array(6).fill([])).slice(0, 6));
  return (
    <div className="guess-container">
      {guesses
        .concat(Array(6).fill("     "))
        .slice(0, 6)
        .map((g, i) => (
          <LetterRow key={i} values={g} />
        ))}
    </div>
  );
};

export default Guesses;
