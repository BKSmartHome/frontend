import "@reach/tabs/styles.css";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { ReactElement } from "react";

interface ITabsDashboardProps {
  color?: string;
  panes: Array<{
    menuItem: ReactElement;
    render: ReactElement;
  }>;
}

const TabsDashboard: IComponent<ITabsDashboardProps> = ({
  panes,
  color = "!bg-black",
}) => {
  return (
    <div className="">
      <Tabs orientation="vertical" className="!h-full">
        <TabList
          className={`h-[848px] w-[198px] justify-center mr-20  rounded-[20px]  ${color} py-20`}
        >
          {panes.map((pane, index) => (
            <Tab
              key={index}
              className="!border-none !py-12 !flex !justify-center"
            >
              {pane.menuItem}
            </Tab>
          ))}
        </TabList>
        <TabPanels className={`grow tab-panels rounded-[20px] ${color}`}>
          {panes.map((pane, index) => (
            <TabPanel key={index} className="h-full p-8">
              {pane.render}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabsDashboard;
