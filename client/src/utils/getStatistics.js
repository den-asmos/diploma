export const calculateIncome = (operations, categories) => {
  const categoriesToSearch = categories
    ?.filter((category) => category.type === 'Доход')
    ?.map((category) => category.title);

  const values = operations
    ?.filter((operation) => categoriesToSearch?.includes(operation.category))
    ?.map((operation) => operation.sum);

  return values?.length && values?.reduce((acc, value) => acc + value);
};

export const calculateOutcome = (operations, categories) => {
  const categoriesToSearch = categories
    ?.filter((category) => category.type === 'Расход')
    ?.map((category) => category.title);

  const values = operations
    ?.filter((operation) => categoriesToSearch?.includes(operation.category))
    ?.map((operation) => operation.sum);

  return values?.length && values?.reduce((acc, value) => acc + value);
};

export const getStatistics = (operations, categories) => {
  const labels = categories
    ?.filter((category) => category.type === 'Расход')
    ?.map((category) => category.title)
    ?.slice(0, 5);

  const stats = operations
    ?.filter((operation) => labels.includes(operation.category))
    ?.map((operation) => operation.sum);

  return { labels, stats };
};
