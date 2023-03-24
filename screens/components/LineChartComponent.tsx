import { Option, Select } from "@material-tailwind/react";
import { capitalize } from "@utils/tools";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

export const LineChart: IComponent<{
  monitorType: string;
}> = ({ monitorType = "temperature" }) => {
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: capitalize(monitorType),
          color: "black",
          font: {
            size: 20,
          },
        },
        suggestedMax: 100,
        suggestedMin: 0,
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          color: "black",
          font: {
            size: 20,
          },
        },
      },
      x: {
        title: {
          display: true,
          color: "black",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "black",
          font: {
            size: 16,
          },
        },
      },
    },
  };
  //TODO: fetch data here
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Stat", "Sun"],
    datasets: [
      {
        label: "Temperature",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.1,
        borderColor: "#0E9CFF",
        backgroundColor: "rgba(14, 156, 255, 0.2)", // Set background color here
      },
    ],
  };

  return (
    <div className="bg-white pt-8 pr-8">
      <div className="flex items-center justify-end">
        <div className="!w-[30%]">
          <Select
            label="Last 24h"
            onResize={undefined}
            nonce={undefined}
            onResizeCapture={undefined}
            className="!min-w-[100px]"
          >
            <Option>Last 24h</Option>
            <Option>Last week</Option>
            <Option>Last 30 days</Option>
          </Select>
        </div>
      </div>
      <Line data={chartData} options={options as any} />;
    </div>
  );
};
