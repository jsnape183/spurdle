import KeyboardRow from "./KeyboardRow";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["GO", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
];

const Keyboard = ({ letters, onClick }) => {
  return (
    <div className="keyboard-container">
      {keys.map((kr, i) => (
        <KeyboardRow key={i} letters={letters} keys={kr} onClick={onClick} />
      ))}
    </div>
  );
};

export default Keyboard;
