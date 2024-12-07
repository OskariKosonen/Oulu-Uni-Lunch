// Utility function to get the next weekday dates
const getWeekdayDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 1; dates.length < 5; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const day = nextDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      if (day !== 0 && day !== 6) {
        dates.push(nextDate.toISOString().split('T')[0]); // Format YYYY-MM-DD
      }
    }
    return dates;
  };
  