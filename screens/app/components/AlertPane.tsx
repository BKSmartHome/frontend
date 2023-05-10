import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useListStore } from "@states/alerts";
import { cx } from "@utils/tools";
import { useCallback, useEffect, useMemo } from "react";

export const AlertPane: IComponent = () => {
  //fetch data here
  // TODO: integrate with backend

  // const { alerts, fetchAllAlerts } = useListStore();

  // const fetchAllData = useCallback(async () => {
  //   if (!alerts) fetchAllAlerts(1, 100);

  //   console.log({ alerts });
  // }, [fetchAllAlerts, alerts]);
  // useEffect(() => {
  //   fetchAllData();
  //   console.log({ alerts });
  // }, [fetchAllData]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const alerts: {
    type: string;
    value: string;
    threshold: string;
    createdAt: string;
    updatedAt: string;
  }[] = [
    {
      type: "temperature",
      value: "77.97195937982355",
      threshold: "30",
      createdAt: "2023-05-05T09:13:46.85597Z",
      updatedAt: "2023-05-05T09:13:46.85597Z",
    },
    {
      type: "temperature",
      value: "77.97195937982355",
      threshold: "30",
      createdAt: "2023-05-05T09:13:46.85597Z",
      updatedAt: "2023-05-05T09:13:46.85597Z",
    },
    {
      type: "temperature",
      value: "77.97195937982355",
      threshold: "30",
      createdAt: "2023-05-05T09:13:46.85597Z",
      updatedAt: "2023-05-05T09:13:46.85597Z",
    },
    {
      type: "temperature",
      value: "77.97195937982355",
      threshold: "30",
      createdAt: "2023-05-05T09:13:46.85597Z",
      updatedAt: "2023-05-05T09:13:46.85597Z",
    },
    {
      type: "temperature",
      value: "77.97195937982355",
      threshold: "30",
      createdAt: "2023-05-05T09:13:46.85597Z",
      updatedAt: "2023-05-05T09:13:46.85597Z",
    },
  ];

  const renderHeader = useMemo(
    () => (
      <tr className="text-xs text-[#667085] bg-gray-100 font-normal">
        <th className="p-4">ID</th>
        <th className="p-4">Loại</th>
        <th className="p-4">Giá trị</th>
        <th className="p-4">Ngưỡng</th>
        <th className="p-4">Tạo lúc</th>
        <th className="p-4">Cập nhật lúc</th>
      </tr>
    ),
    []
  );

  const renderValue = useMemo(
    () =>
      alerts.map((item, index) => (
        <tr key={index} className="bg-white text-[#667085] dark:bg-white">
          <td className="px-6 py-2">{index + 1}</td>
          <td className="px-6 py-2">{item.type}</td>
          <td className="px-6 py-2">{item.value}</td>
          <td className="px-6 py-2">{item.threshold}</td>
          <td className="px-6 py-2">{item.createdAt}</td>
          <td className="px-6 py-2">{item.updatedAt}</td>
        </tr>
      )),
    [alerts]
  );

  return (
    <main className="space-y-1 p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>{new Date().toDateString()}</h1>
      </div>
      <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400 rounded-lg bg-white overflow-hidden">
        <thead className="text-gray-900 dark:bg-gray-700 dark:text-gray-400">
          {renderHeader}
        </thead>
        <tbody className=" font-medium whitespace-nowrap dark:text-white ">
          {renderValue}
        </tbody>
      </table>
    </main>
  );
};
