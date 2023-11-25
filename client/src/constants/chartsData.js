export const lineChart = (labels, stats) => ({
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Статистика расходов',
      },
    },
  },
  data: {
    labels,
    datasets: [
      {
        label: 'Расходы',
        data: stats,
        backgroundColor: 'rgb(192, 252, 234)',
      },
    ],
  },
});

export const pieChart = (income, outcome) => ({
  labels: ['Доходы', 'Расходы'],
  datasets: [
    {
      data: [income, outcome],
      backgroundColor: ['rgb(109, 213, 181)', 'rgb(255, 235, 107)'],
    },
  ],
});
