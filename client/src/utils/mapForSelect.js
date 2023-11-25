export const mapForSelect = (array) => {
  return array.map((item) => ({
    value: item.title,
    label: item.title,
  }));
};
