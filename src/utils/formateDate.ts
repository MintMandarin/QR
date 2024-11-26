export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);

  // Get the time (5:40pm format)
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Get the day of the week (Monday)
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

  // Get the day (16th format)
  const day = date.getDate();
  const dayWithSuffix = `${day}${getDaySuffix(day)}`;

  // Get the month (September)
  const month = date.toLocaleDateString("en-US", { month: "long" });

  // Get the year (2024)
  const year = date.getFullYear();

  // Combine everything into the desired format
  return `${time} on ${weekday} ${dayWithSuffix} ${month} ${year}`;
};

// Helper function to get the suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
const getDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return "th"; // Catch all 11th-20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formateDateToRedable = (date: string) => {
  const dateInIST = new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", // Day as 2 digits
    month: "short", // Month as short name (e.g., Oct)
    year: "numeric", // Full year
  });

  return dateInIST;
};
