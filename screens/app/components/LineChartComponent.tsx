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
  const [timeframe, setTimeframe] = useState<string>("24h");
  const fetchData = useCallback(async () => {
    if (data[monitorType]?.length > 0) return;
    const now = new Date();
    let twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); //
    if (timeframe === "1w") {
      twentyFourHoursAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === "30d") {
      twentyFourHoursAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    const from = twentyFourHoursAgo.toISOString().replace("Z", "+00:00");
    const to = now.toISOString().replace("Z", "+00:00");
    await fetchAllSensorData(monitorType, from, to);
  }, [data, fetchAllSensorData, monitorType, timeframe]);

  useEffect(() => {
    fetchData();
  }, [data, fetchData]);
  const chartData = useMemo(
    () => ({
      labels: data
        ? data[monitorType]?.map((d: any) =>
            new Date(d.createdAt).toLocaleTimeString()
          )
        : [],
      datasets: [
        {
          label: "Temperature",
          data: data[monitorType]?.map((d: any) => d.value),
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
    <div className="bg-white pt-8 pr-8">
      <div className="flex items-center justify-end">
        <div className="!w-[30%]">
          <Select
            label="Last 24h"
            onResize={undefined}
            nonce={undefined}
            onResizeCapture={undefined}
            className="!min-w-[100px]"
            value={timeframe}
            onChange={(e) =>
              e?.target && setTimeframe(e.target.value as string)
            }
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
