export const changeDateFormat = (date: string) => {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const result = new Date(date);
  const year = result.getFullYear();
  const month = monthArr[result.getMonth()];
  const day = result.getDate();
  return `${month} ${day}. ${year}`;
};
