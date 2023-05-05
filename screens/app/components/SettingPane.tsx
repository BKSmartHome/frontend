import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { cx } from "@utils/tools";
import { connect, MqttClient } from "mqtt";
import { useEffect, useMemo, useState } from "react";

import styles from "./styles.module.scss";

export const SettingPane: IComponent = () => {
  const data = [
    {
      label: "Mật khẩu",
      value: "password",
      children: (
        <div className="flex justify-center w-full items-center">
          <Card className="w-2/3 ">
            <CardHeader
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              floated={false}
              shadow={false}
              className="h-12 items-center grid border-b"
            >
              <Typography
                variant="h5"
                className="flex justify-center items-center"
              >
                Đổi mật khẩu
              </Typography>
            </CardHeader>
            <CardBody
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <Typography variant="h6"> Mật khẩu cũ </Typography>
              <Input
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                type="text"
                placeholder="Nhập mật khẩu cũ"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                className={
                  "rounded-md !border-t-purple-gray-200 focus:!border-t-purple-500 "
                }
              />
              <Typography variant="h6" className="pt-3">
                {" "}
                Mật khẩu mới{" "}
              </Typography>
              <Input
                type="text"
                placeholder="Nhập mật khẩu mới"
                className="rounded-md !border-t-purple-gray-200 focus:!border-t-purple-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Typography variant="h6" className="pt-3">
                {" "}
                Xác nhận mật khẩu{" "}
              </Typography>
              <Input
                type="text"
                placeholder="Nhập lại mật khẩu mới"
                className="rounded-md !border-t-purple-gray-200 focus:!border-t-purple-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
              />
            </CardBody>
            <CardFooter className="flex items-center justify-center">
              <Button
                className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700"
                size="lg"
              >
                Xác nhận
              </Button>
            </CardFooter>
          </Card>
        </div>
      ),
    },
    {
      label: "Thông báo",
      value: "notification",
      children: (
        <div className="flex justify-center w-full items-center">
          <Card className="w-2/3">
            <CardHeader
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              floated={false}
              shadow={false}
              className="h-12 items-center grid border-b"
            >
              <Typography
                variant="h5"
                className="flex justify-center items-center"
              >
                Thiết lập thông báo
              </Typography>
            </CardHeader>
            <CardBody
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <Typography variant="h6"> Tên người nhận </Typography>
              <Input
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                type="text"
                placeholder="Nhập tên người nhận"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                className={
                  "rounded-md !border-t-purple-gray-200 focus:!border-t-purple-500 "
                }
              />
              <Typography variant="h6" className="pt-3">
                {" "}
                Email người nhận{" "}
              </Typography>
              <Input
                type="mail"
                placeholder="Nhập email người nhận"
                className="rounded-md !border-t-purple-gray-200 focus:!border-t-purple-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Typography variant="h6" className="pt-3">
                {" "}
                Loại thông báo{" "}
              </Typography>
              <div className="space-y-3 pt-2 flex flex-col">
                <Switch
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  id="temperature"
                  label="Thông báo về cảm biến nhiệt độ"
                  color="purple"
                  defaultChecked={false}
                />
                <Switch
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  id="light"
                  label="Thông báo về cảm biến ánh sáng"
                  color="purple"
                  defaultChecked={false}
                />
                <Switch
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  id="soilmoisture"
                  label="Thông báo về cảm biến độ ẩm đất"
                  color="purple"
                  defaultChecked={false}
                />
                <Switch
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  id="smoke"
                  label="Thông báo về cảm biến khói"
                  color="purple"
                  defaultChecked={false}
                />
                <Switch
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  id="infrared"
                  label="Thông báo về cảm biến hồng ngoại"
                  color="purple"
                  defaultChecked={false}
                />
              </div>
            </CardBody>
            <CardFooter className="flex items-center justify-center">
              <Button
                className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700"
                size="lg"
              >
                Xác nhận
              </Button>
            </CardFooter>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <main className="space-y-1">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>
      <Tabs>
        <TabsHeader className="w-1/3">
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={cx("p-3 font-bold rounded-inherit")}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="mt-4">
          {data.map(({ value, children }) => (
            <TabPanel key={value} value={value} className="rounded-lg">
              {children}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </main>
  );
};
