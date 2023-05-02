import { ReactElement } from "react";

export const DashboardItemComponent: IComponent<{
  name: string;
  icon: ReactElement;
}> = ({ name, icon }) => {
  return (
    <div className="grow flex !item-center rounded-lg gap-2">
      <div className="w-[32px] h-[32px] ">{icon}</div>
      <h2 className="text-md">{name}</h2>
    </div>
  );
};
