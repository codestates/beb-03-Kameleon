import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({
  agree,
  disagree,
  totalSupply,
}: {
  [x: string]: number;
}) => {
  console.log(agree, disagree, totalSupply);
  const data = {
    labels: ['Agree', 'Disaggree', 'other'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [agree, disagree, totalSupply - agree - disagree],
        backgroundColor: ['#6675FF', '#FF6363', '#999'],
        hoverOffset: 3,
      },
    ],
    reverse: true,
  };

  return (
    <Doughnut
      data={data}
      height={'200rem'}
      options={{ maintainAspectRatio: false }}
    />
  );
};
export default DoughnutChart;
