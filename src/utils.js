export const daysDiff = (date1, date2) =>
  (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);

export const toUTC = (date) =>
  new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );

export const addToLocalStorage = (attempts) => {
  const dateStamp = toUTC(new Date());
  if (!localStorage.sessions) {
    localStorage.setItem("sessions", "[]");
  }
  let history = [];
  if (localStorage.getItem("sessions")) {
    history = JSON.parse(localStorage.getItem("sessions"));
  }
  const item = {
    date: dateStamp.getDate(),
    month: dateStamp.getMonth(),
    year: dateStamp.getFullYear(),
    attempts
  };
  const index = history.findIndex(
    (h) =>
      h.date == dateStamp.getDate() &&
      h.month == dateStamp.getMonth() &&
      h.year == dateStamp.getFullYear()
  );

  if (index >= 0) {
    history[index] = item;
  }

  if (index < 0) {
    history.push(item);
  }

  localStorage.setItem("sessions", JSON.stringify(history));
};

export const getFromLocalStorage = () => {
  const dateStamp = toUTC(new Date());
  let history = [];
  if (localStorage.getItem("sessions")) {
    history = JSON.parse(localStorage.getItem("sessions"));
  }
  const item = history.find(
    (h) =>
      h.date === dateStamp.getDate() &&
      h.month === dateStamp.getMonth() &&
      h.year === dateStamp.getFullYear()
  );

  if (!item) return [];

  return item.attempts;
};

export const getHistory = () => {
  let history = [];
  if (localStorage.getItem("sessions")) {
    history = JSON.parse(localStorage.getItem("sessions"));
  }
  return history;
};
