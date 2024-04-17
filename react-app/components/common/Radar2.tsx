import React from "react";
import ReactECharts from "echarts-for-react";

interface RadarData {
  name: string;
  value: number[];
}

interface RadarIndicator {
  name: string;
}

interface Props {
  data: RadarData[];
  indicators: RadarIndicator[];
  maxValue: number;
}

const Radar2: React.FC<Props> = ({ data, indicators, maxValue}) => {
  
  // 生成颜色数组的函数
  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      // 这里可以根据需要修改颜色生成逻辑
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
      colors.push(color);
    }
    return colors;
  };

  // 使用传入的数据动态生成颜色数组
  const colors = generateColors(data.length);

  const options = {
      textStyle: {
          fontWeight: "200",
          color: "black"
      },
      legend: [
        {
          data: data.map((item: RadarData, index: number) => ({
            name: item.name,
            itemStyle: { color: colors[index] }
          })),
          orient: "vertical",
          icon: "circle",
          bottom: 0,
          left: 0,
          textStyle: {
            fontWeight: "700",
            color: "black"
          }
      }
    ],
    radar: [
      {
        splitNumber: maxValue,
        splitLine: {
          lineStyle: {
            color: "#B46372"
          }
        },
        center: ["50%", "50%"],
        splitArea: false,
        indicator: indicators.map((indicator: RadarIndicator, index: number) => ({
          name: indicator.name,
          max: maxValue,
          axisLabel: { show: index === 0 }
        })),
        axisLine: {
          lineStyle: {
            color: "#B46372"
          }
        }
      }
    ],
    series: [
      {
        name: "Vinyl vs Streaming",
        type: "radar",
        symbolSize: 0,
        data: data.map((item: RadarData, index: number) => ({
          value: item.value,
          name: item.name,
          lineStyle: {
            width: 3,
            color: colors[index], // 使用对应索引的颜色
            shadowColor: colors[index],
            shadowOffsetY: 2,
            shadowOffsetX: 2
          }
        }))
      }
    ]
  };

  return (
    <div className="radar">
      <ReactECharts
        option={options}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Radar2;
