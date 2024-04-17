import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RadarData {
  name: string;
  value: number[];
}

interface RadarIndicator {
  name: string;
}

interface Props {
  datas: RadarData[];
  indicators: RadarIndicator[];
}

const VBarChart: React.FC<Props> = ({ datas, indicators}) => {

  const borderColors:any[] = [];
  const backgroundColors:any[] = [];
  let R =0;
  let G =0;
  let B =0;
  for (let i = 0; i < datas.length; i++) {
    R = Math.floor(Math.random() * 256);
    G = Math.floor(Math.random() * 256);
    B = Math.floor(Math.random() * 256);
    const borderColor = `rgba(${R}, ${G}, ${B}, 1)`;
    borderColors.push(borderColor);
    const backgroundColor = `rgba(${R}, ${G}, ${B}, 0.2)`;
    backgroundColors.push(backgroundColor);
  }

  const labels:String[] = []
  indicators.map((indicator) => (
    labels.push(indicator.name)
  ));
  const datasets:any[] =[]
  datas.map((data, index) => (
    datasets.push({
      label: data.name,
      data: data.value,
      backgroundColor: backgroundColors[index], // 使用生成的颜色数组
      borderColor: borderColors[index],
      borderWidth: 1
    })
  ));

  const data = {
    labels,
    datasets: datasets
  };
  return (
    <div className="radar">
      <Bar data={data} />
    </div>
  );

}

export default VBarChart;
