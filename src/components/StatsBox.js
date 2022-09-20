import "../stats.css";
import StatsBar from "./StatsBar";
import ShareButton from "./ShareButton";
import { generateStats } from "../stats";

const StatsBox = ({ history }) => {
  const stats = generateStats(history);
  return (
    <>
      <h4>Statistics</h4>
      <div className="stats-container">
        <div className="stats-box">
          <div className="stat">{stats.played}</div>
          <div className="stat-label">Played</div>
        </div>
        <div className="stats-box">
          <div className="stat">{`${(stats.won / stats.played) * 100}%`}</div>
          <div className="stat-label">Won</div>
        </div>
        <div className="stats-box">
          <div className="stat">{stats.currentStreak}</div>
          <div className="stat-label">Current Streak</div>
        </div>
        <div className="stats-box">
          <div className="stat">{stats.maxStreak}</div>
          <div className="stat-label">Max Streak</div>
        </div>
      </div>
      <hr />
      <h4>Guess Distribution</h4>
      <div className="distribution-container">
        {stats.guessDistribution.map((d, i) => (
          <div key={i} className="distribution-row">
            <div className="distribution-label">{i + 1}:</div>
            <div className="distribution-bar">
              <StatsBar
                length={d / stats.won}
                label={d}
                selected={i === stats.latestGuessAt}
              />
            </div>
          </div>
        ))}
      </div>
      <hr />
      <ShareButton attempts={history.reverse()[history.length-1]?.attempts} />
    </>
  );
};

export default StatsBox;
