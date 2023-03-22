import { DashboardSVG } from "@components/SVGIcons/DashboardSVG";
import { HomeSVG } from "@components/SVGIcons/HomeSVG";
import TabsDashboard from "@components/TabsDashboard";
import { capitalize } from "@utils/tools";
import { ReactElement } from "react";

const MenuItemComponent: IComponent<{
  name: string;
  icon: ReactElement;
}> = ({ name, icon }) => {
  return (
    <div className="w-[94px] h-[94px] bg-[#32383D] rounded-[20px] flex flex-col items-center justify-center gap-2">
      <h2 className="text-sm">{capitalize(name)}</h2>
      <div className="w-[28px] h-[28px]">{icon}</div>
    </div>
  );
};

const Dashboard: IComponent = () => {
  const panes = [
    {
      menuItem: <MenuItemComponent name="dashboard" icon={<DashboardSVG />} />,
      render: <div>Dashboard</div>,
    },
    {
      menuItem: (
        <MenuItemComponent name="copy of dashboard" icon={<DashboardSVG />} />
      ),
      render: <div>Copy of Dashboard</div>,
    },
  ];
  return (
    <div className="dashboard after:relative z-10 w-full rounded-3xl">
      <TabsDashboard panes={panes} />
    </div>
  );
};

export default Dashboard;
