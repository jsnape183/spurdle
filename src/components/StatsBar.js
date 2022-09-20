const StatsBar = ({ length, label, selected }) => (
  <div
    style={{
      maxWidth: `${length * 100}%`,
      minWidth: "20px",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: selected ? "rgb(83, 141, 78)" : "#444444"
    }}
  >
    <span style={{ float: "right", marginRight: "5px" }}>{label}</span>
  </div>
);

export default StatsBar;
