import { SettingSVG } from "@components/SVGIcons/SettingSVG";
import { TabsDashboard } from "@components/TabsDashboard";
import {
  BellAlertIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { capitalizeFirstLetter, cx } from "@utils/tools";
import { ReactElement } from "react";

import { AlertPane } from "./components/AlertPane";
import { AnalysisPane } from "./components/AnalysisPane";
import { DashboardPane } from "./components/DashboardPane";
import { SettingPane } from "./components/SettingPane";

export const MenuItemComponent: IComponent<{
  name: string;
  icon: ReactElement;
}> = ({ name, icon }) => {
  return (
    <div className="text-black grow flex !item-center rounded-lg gap-2">
      <div className="w-[32px] h-[32px] ">{icon}</div>
      <h2 className="text-md">{capitalizeFirstLetter(name)}</h2>
    </div>
  );
};

const Dashboard: IComponent<{
  className?: string;
}> = ({ className }) => {
  const panes = [
    {
      menuItem: (
        <MenuItemComponent name="dashboard" icon={<Squares2X2Icon />} />
      ),
      render: <DashboardPane />,
    },
    // {
    //   menuItem: <MenuItemComponent name="control" icon={<Cog6ToothIcon />} />,
    //   render: <ControlPane />,
    // },
    {
      menuItem: (
        <MenuItemComponent
          name="analysis"
          icon={<ChartBarIcon></ChartBarIcon>}
        />
      ),
      render: <AnalysisPane />,
    },
    {
      menuItem: <MenuItemComponent name="alert" icon={<BellAlertIcon />} />,
      render: <AlertPane />,
    },
    {
      menuItem: <MenuItemComponent name="setting" icon={<SettingSVG />} />,
      render: <SettingPane />,
    },
  ];
  return (
    <div
      className={cx(
        "dashboard after:relative z-10 w-full h-full rounded-3xl font-serif",
        className
      )}
    >
      <TabsDashboard panes={panes} activeColor="!bg-white" />
    </div>
  );
};

export default Dashboard;
