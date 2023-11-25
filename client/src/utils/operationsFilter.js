const compareByDate = (a, b) => {
  return b.date - a.date;
};

export const operationsFilter = (array, key, option) => {
  if (key === 'date') {
    const sorted = array.toSorted(compareByDate);

    return option === 'Сначала новые' ? sorted : sorted.reverse();
  }

  return array.filter((item) => item[key] === option);
};
