import { Option, Select } from "@material-tailwind/react";
import { useAlertStore } from "@states/alerts";
import { useCallback, useEffect, useMemo, useState } from "react";

type TTimeOptions = "24h" | "1w" | "30d";

export const AlertPane: IComponent = () => {
  const { alerts, fetchAllAlerts } = useAlertStore();
  const [timeOption, setTimeOption] = useState<TTimeOptions>("24h");
  const fetchAllData = useCallback(async () => {
    const now = new Date();
    let twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (timeOption === "1w") {
      twentyFourHoursAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeOption === "30d") {
      twentyFourHoursAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    const from = twentyFourHoursAgo.toISOString().replace("Z", "+00:00");
    const to = now.toISOString().replace("Z", "+00:00");
    const pageSize = 100;
    fetchAllAlerts(from, to, pageSize);
  }, [fetchAllAlerts, timeOption]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const renderHeader = useMemo(
    () => (
      <tr className="text-xs text-[#667085] bg-gray-100 font-normal">
        <th className="p-4">ID</th>
        <th className="p-4">Loại</th>
        <th className="p-4">Giá trị</th>
        <th className="p-4">Ngưỡng</th>
        <th className="p-4">Thời gian</th>
        {/* <th className="p-4">Cập nhật lúc</th> */}
      </tr>
    ),
    []
  );

  const renderValue = useMemo(
    () =>
      alerts?.map((item, index) => {
        const time =
          new Date(item.createdAt).toLocaleTimeString() +
          " " +
          new Date(item.createdAt).toLocaleDateString();
        return (
          <tr key={index} className="bg-white text-[#667085] dark:bg-white">
            <td className="px-6 py-2">{index + 1}</td>
            <td className="px-6 py-2">{item.type}</td>
            <td className="px-6 py-2">{item?.value ?? "NA"}</td>
            <td className="px-6 py-2">{item?.threshold ?? "NA"}</td>
            <td className="px-6 py-2">{time}</td>
            {/* <td className="px-6 py-2">{item.updatedAt}</td> */}
          </tr>
        );
      }),
    [alerts]
  );

  return (
    <main className="p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>{new Date().toDateString()}</h1>
      </div>
      <div className="h-[70vh] overflow-y-scroll rounded-lg overflow-x-hidden">
        <div className="!w-[30%] mb-4">
          <Select
            onResize={undefined}
            nonce={undefined}
            onResizeCapture={undefined}
            className="!min-w-[100px] bg-white"
            value={timeOption}
            onChange={(v) => v && setTimeOption(v as TTimeOptions)}
          >
            <Option value="24h">Last 24h</Option>
            <Option value="1w">Last week</Option>
            <Option value="30d">Last 30 days</Option>
          </Select>
        </div>
        <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400 rounded-lg bg-white overflow-hidden">
          <thead className="text-gray-900 dark:bg-gray-700 dark:text-gray-400">
            {renderHeader}
          </thead>
          <tbody className=" font-medium whitespace-nowrap dark:text-white ">
            {renderValue}
          </tbody>
        </table>
      </div>
    </main>
  );
};
