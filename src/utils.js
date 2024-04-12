export const capitalize = (param) => {
  if(param === '')  return '';
  return (
    param
      ?.replace("-", " ")
      .split(" ")
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      })
      .join(" ") || ""
  );
};

export function toggle(array, data) {
  if (array.includes(data)) {
    return array.filter((x) => x !== data);
  }
  return [...array, data];
}
