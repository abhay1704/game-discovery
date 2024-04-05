export const capitalize = (param) => {
  return param
    .replace("-", " ")
    .split(" ")
    .map((str) => {
     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    })
    .join(" ");
};
