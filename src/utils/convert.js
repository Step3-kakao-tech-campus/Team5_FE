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
