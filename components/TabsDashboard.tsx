import "@reach/tabs/styles.css";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

interface ITabsDashboardProps {
  color?: string;
  activeColor?: string;
  panes: Array<{
    menuItem: ReactElement;
    render: ReactElement;
  }>;
}

export const TabsDashboard: IComponent<ITabsDashboardProps> = ({
  panes,
  color = "!bg-transparent",
  activeColor = "!bg-black",
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const activeTabName = router.query.tab || panes[0].menuItem.props.name;
    const activeTabIndex = panes.findIndex(
      (pane) => pane.menuItem.props.name === activeTabName
    );

    if (activeTabIndex !== -1) {
      setActiveTab(activeTabIndex);
    }
  }, [router.query.tab, panes]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);

    const activeTabName = panes[index].menuItem.props.name;
    router.replace({ query: { tab: activeTabName } });
  };
  return (
    <div className="">
      <Tabs
        orientation="vertical"
        index={activeTab}
        onChange={handleTabChange}
        className="!h-full gap-12 transition-all duration-150"
      >
        <TabList className="h-fit flex gap-8 rounded-lg">
          {panes.map((pane, index) => (
            <Tab
              key={index}
              className={`!border-white shadow-md shadow-white !py-4 !px-12 !flex !justify-center items-center !rounded-lg ${
                activeTab === index
                  ? activeColor + " " + "!text-white font-semibold"
                  : ""
              }`}
            >
              {pane.menuItem}
            </Tab>
          ))}
        </TabList>
        <TabPanels className={`grow tab-panels rounded-lg h-full ${color}`}>
          {panes.map((pane, index) => (
            <TabPanel key={index} className="h-full p-4 rounded-lg">
              {pane.render}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};
