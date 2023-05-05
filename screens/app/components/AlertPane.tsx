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

  const { alerts, fetchAllAlerts } = useListStore();

  const fetchAllData = useCallback(async () => {
    if (!alerts) fetchAllAlerts(1, 100);

    console.log({ alerts });
  }, [fetchAllAlerts, alerts]);
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // const renderHeader = useMemo(
  //   () => (
  //     <tr className="text-xs text-[#667085] bg-gray-100  font-normal">
  //       <th className="p-4">ID</th>
  //       <th className="p-4">Giá trị</th>
  //       <th className="p-4">Ngưỡng</th>
  //       <th className="p-4">Trạng thái</th>
  //       <th className="p-4">Thời gian</th>
  //     </tr>
  //   ),
  //   []
  // );

  // const renderTemperature = useMemo(
  //   () =>
  //     Temperature.map((item, index) => (
  //       <tr key={index} className="bg-white dark:bg-gray-800 border-8">
  //         <td className="px-6 py-2">{index + 1}</td>
  //         <td className="px-6 py-2">{item.value}</td>
  //         <td className="px-6 py-2">{item.threshold}</td>
  //         <td className="px-6 py-2">{item.Status}</td>
  //         <td className="px-6 py-2">{item.time}</td>
  //       </tr>
  //     )),
  //   [Temperature]
  // );

  // const renderSoilmoisture = useMemo(
  //   () =>
  //     Soilmoisture.map((item, index) => (
  //       <tr key={index} className="bg-white dark:bg-gray-800 border-8">
  //         <td className="px-6 py-2">{index + 1}</td>
  //         <td className="px-6 py-2">{item.value}</td>
  //         <td className="px-6 py-2">{item.threshold}</td>
  //         <td className="px-6 py-2">{item.Status}</td>
  //         <td className="px-6 py-2">{item.time}</td>
  //       </tr>
  //     )),
  //   [Soilmoisture]
  // );

  // const renderSmoke = useMemo(
  //   () =>
  //     Smoke.map((item, index) => (
  //       <tr key={index} className="bg-white dark:bg-gray-800 border-8">
  //         <td className="px-6 py-2">{index + 1}</td>
  //         <td className="px-6 py-2">{item.value}</td>
  //         <td className="px-6 py-2">{item.threshold}</td>
  //         <td className="px-6 py-2">{item.Status}</td>
  //         <td className="px-6 py-2">{item.time}</td>
  //       </tr>
  //     )),
  //   [Smoke]
  // );

  // const renderInfrared = useMemo(
  //   () =>
  //     Infrared.map((item, index) => (
  //       <tr key={index} className="bg-white dark:bg-gray-800 border-8">
  //         <td className="px-6 py-2">{index + 1}</td>
  //         <td className="px-6 py-2">{item.value}</td>
  //         <td className="px-6 py-2">{item.threshold}</td>
  //         <td className="px-6 py-2">{item.Status}</td>
  //         <td className="px-6 py-2">{item.time}</td>
  //       </tr>
  //     )),
  //   [Infrared]
  // );

  // const data = [
  //   {
  //     label: "Nhiệt độ",
  //     value: "temperature",
  //     children: (
  //       <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400">
  //         <thead className=" text-gray-900 bg-gray-600 dark:bg-gray-700 dark:text-gray-400">
  //           {renderHeader}
  //         </thead>
  //         <tbody className=" font-medium text-gray-900 whitespace-nowrap dark:text-white ">
  //           {renderTemperature}
  //         </tbody>
  //       </table>
  //     ),
  //   },
  //   {
  //     label: "Độ ẩm đất",
  //     value: "soilmoisture",
  //     children: (
  //       <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400">
  //         <thead className=" text-gray-900 bg-gray-600 dark:bg-gray-700 dark:text-gray-400">
  //           {renderHeader}
  //         </thead>
  //         <tbody className=" font-medium text-gray-900 whitespace-nowrap dark:text-white ">
  //           {renderSoilmoisture}
  //         </tbody>
  //       </table>
  //     ),
  //   },
  //   {
  //     label: "Khói",
  //     value: "smoke",
  //     children: (
  //       <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400">
  //         <thead className=" text-gray-900 bg-gray-600 dark:bg-gray-700 dark:text-gray-400">
  //           {renderHeader}
  //         </thead>
  //         <tbody className=" font-medium text-gray-900 whitespace-nowrap dark:text-white ">
  //           {renderSmoke}
  //         </tbody>
  //       </table>
  //     ),
  //   },
  //   {
  //     label: "Hồng ngoại",
  //     value: "infrared",
  //     children: (
  //       <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400">
  //         <thead className=" text-gray-900 bg-gray-600 dark:bg-gray-700 dark:text-gray-400">
  //           {renderHeader}
  //         </thead>
  //         <tbody className=" font-medium text-gray-900 whitespace-nowrap dark:text-white ">
  //           {renderInfrared}
  //         </tbody>
  //       </table>
  //     ),
  //   },
  // ];

  return (
    <main className="space-y-1">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>
      {/* <Tabs>
        <TabsHeader
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={cx("p-3 font-bold rounded-inherit")}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          className="mt-4"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {data.map(({ value, children }) => (
            <TabPanel key={value} value={value} className="bg-white rounded-lg">
              {children}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs> */}
    </main>
  );
};
