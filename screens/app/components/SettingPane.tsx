import { Switch } from "@material-tailwind/react";
import { cx } from "@utils/tools";
import { connect, MqttClient } from "mqtt";
import { useEffect, useMemo, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
} from "@material-tailwind/react";


import styles from "./styles.module.scss";

export const SettingPane: IComponent = () => {

  const changePassword = useMemo(() => {
    return (
      <div>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input type="password" label="Old Password" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
            <Input type="password" label="New Password" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
            <Input type="password" size="lg" label="Type New Password" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          </div>
        </form>
      </div>
    );
  }, []);

  const alert = useMemo(() => {
    return (
      <div className="bg-white flex justify-center">
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
            <Input size="lg" label="Email" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
            
          </div>
        </form>
      </div>
    );
  }, []);

  const tabSetting = useMemo(() => {
    const data = [
      {
        label: "Change Password",
        value: "Change Password",
        desc: changePassword, 
      },
      {
        label: "Alert",
        value: "Alert",
        desc: alert,
      },
    ];

    return (
      <Tabs value="html">
          <TabsHeader nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value} nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
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
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>

      <div className="min-h-[60vh] grid grid-rows-2 gap-8 ">
        {tabSetting}
      </div>
    </div>
  );
};
