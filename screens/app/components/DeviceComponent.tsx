import SwitchButton from "@components/Switch";
import { cx } from "@utils/tools";
import { ReactElement } from "react";

import { TDeviceStatus } from "./DashboardPane";

export const DeviceComponent: IComponent<{
  className?: string;
  name: string;
  icon: ReactElement;
  status: TDeviceStatus;
  onToggle: () => void;
}> = ({ icon, status, className, onToggle }) => {
  return (
    <div
      className={cx(
        "flex items-center justify-center  p-12 shadow-lg rounded-lg",
        className
      )}
    >
      <div>{icon}</div>
      <div className="flex gap-4 relative items-center justify-center">
        <span className="font-bold text-lg">OFF</span>
        <SwitchButton status={status} onToggle={onToggle} />
        <span className="font-bold text-lg">ON</span>
      </div>
    </div>
  );
};
