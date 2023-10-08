export const comma = (num) => {
  // Truthy, Falsy로만 판별하면 type을 검사하지 못함
  if (num === undefined || num === null) {
    return 0;
  }
  // eslint-disable-next-line no-restricted-globals
  if (typeof num === "number" && isNaN(num)) {
    return 0;
  }
  if (typeof num === "string") {
    // eslint-disable-next-line radix
    num = parseInt(num);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// "2023-09-14T14:09:03+09:00" -> "2023-09-14 14:09:03"
export const convertISO8601ToDateTime = (dateString) => {
  // Parse the input string into a Date object
  const inputDate = new Date(dateString);

  // Format the date in the desired format
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");
  const hour = String(inputDate.getHours()).padStart(2, "0");
  const minute = String(inputDate.getMinutes()).padStart(2, "0");
  const second = String(inputDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return formattedDate;
};
