import { Option, Select } from "@material-tailwind/react";
import { useSensorDataStore } from "@states/data";
import { capitalizeFirstLetter } from "@utils/tools";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

type TTimeOptions = "24h" | "1w" | "30d";

export const LineChart: IComponent<{
  monitorType: TMonitorSensorType;
}> = ({ monitorType = "temperature" }) => {
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: capitalizeFirstLetter(monitorType),
          color: "black",
          font: {
            size: 20,
          },
        },
        suggestedMax: 100,
        suggestedMin: 0,
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          color: "black",
          font: {
            size: 20,
          },
        },
        gridLines: {
          display: true,
          color: "gray",
          zeroLineColor: "white",
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

  const { data, fetchAllSensorData } = useSensorDataStore();

  const [timeOption, setTimeOption] = useState<TTimeOptions>("24h");
  const fetchData = useCallback(async () => {
    const now = new Date();
    let twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); //
    if (timeOption === ("1w" as TTimeOptions)) {
      twentyFourHoursAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeOption === ("30d" as TTimeOptions)) {
      twentyFourHoursAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    const from = twentyFourHoursAgo.toISOString().replace("Z", "+00:00");
    const to = now.toISOString().replace("Z", "+00:00");
    fetchAllSensorData(monitorType, from, to);
  }, [fetchAllSensorData, monitorType, timeOption]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = useMemo(
    () => ({
      labels: data
        ? data[monitorType]?.map(
            (d: ISensorData) =>
              new Date(d.createdAt).toLocaleTimeString() +
              " " +
              new Date(d.createdAt).toLocaleDateString()
          )
        : [],
      datasets: [
        {
          label: "Temperature",
          data: data[monitorType]?.map((d: ISensorData) => d.value),
          fill: false,
          tension: 0.1,
          borderColor: "#0E9CFF",
          backgroundColor: "rgba(14, 156, 255, 0.2)", // Set background color here
        },
      ],
    }),
    [data, monitorType]
  );

  return (
    <div className="bg-white py-4 pl-4">
      <div className="flex items-center justify-end">
        <div className="!w-[30%]">
          <Select
            label="Last 24h"
            onResize={undefined}
            nonce={undefined}
            onResizeCapture={undefined}
            className="!min-w-[100px] bg-white ml-0"
            value={timeOption}
            onChange={(v) => v && setTimeOption(v as TTimeOptions)}
          >
            <Option value="24h">Last 24h</Option>
            <Option value="1w">Last week</Option>
            <Option value="30d">Last 30 days</Option>
          </Select>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};
