const dateParse = (str) => {
  const year = parseInt(str.substring(0, 4));
  const month = parseInt(str.substring(5, 7)) - 1;
  const day = parseInt(str.substring(8, 10));

  const date = new Date(year, month, day);
  const dateStr = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return dateStr;
};

export default dateParse;
