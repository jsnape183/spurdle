const getPlayed = (history) => history.length;

const getWon = (history) =>
  history.filter((h) => h.attempts.some((a) => a.correct)).length;

const getCurrentStreak = (history) => {
  const streaks = getStreaks(history);

  if (streaks.length === 0) return 0;

  return streaks[0];
};

const getMaxStreak = (history) => Math.max(...getStreaks(history));

const getStreaks = (history) => {
  let streaks = [];
  let streakCount = 0;

  for (let ptr = 0; ptr < history.length; ptr++) {
    if (history[ptr].attempts.some((a) => a.correct)) {
      streakCount++;
      continue;
    }
    console.log(streakCount);
    streaks.push(streakCount);
    streakCount = 0;
  }
  streaks.push(streakCount);
  console.log(streaks);
  return streaks;
};

const getGuessDistribution = (history) => {
  const distribution = Array(6).fill(0);
  console.log(distribution);
  const corrects = history.filter((h) => h.attempts.some((a) => a.correct));

  corrects.forEach((c) => {
    distribution[c.attempts.length-1]++;
  });

  return distribution;
};

export const generateStats = (history) => ({
  played: getPlayed(history),
  won: getWon(history),
  currentStreak: getCurrentStreak(history),
  maxStreak: getMaxStreak(history),
  guessDistribution: getGuessDistribution(history),
  latestGuessAt: history.reverse()[0]?.attempts.length-1
});
