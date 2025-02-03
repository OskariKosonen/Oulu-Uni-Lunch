function getWeekdayDates() {
  const dates = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilNextMonday = (8 - dayOfWeek) % 7;

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + daysUntilNextMonday + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}

module.exports = { getWeekdayDates };