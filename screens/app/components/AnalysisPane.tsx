import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { cx } from "@utils/tools";
import { useCallback } from "react";

import { LineChart } from "./LineChartComponent";

export const AnalysisPane: IComponent = () => {
  const renderChart = useCallback(() => {
    const tabs = [
      {
        label: "Temperature",
        value: "temperature",
      },
      {
        label: "Humidity",
        value: "humidity",
      },
      {
        label: "Light",
        value: "light",
      },
    ];
    return (
      <Tabs value="temperature">
        <TabsHeader
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="p-0 w-[50%]"
        >
          {tabs.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              className={cx("p-3 font-bold rounded-inherit")}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="mt-4"
        >
          {tabs.map(({ value }) => (
            <TabPanel key={value} value={value} className="bg-white rounded-lg">
              <LineChart monitorType={value as TMonitorSensorType} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }, []);
  return (
    <div className="p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>{new Date().toDateString()}</h1>
      </div>
      {renderChart()}
    </div>
  );
};
