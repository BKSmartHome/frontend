import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
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
import React, { useMemo, useState } from "react";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

export const SettingPane: IComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderDialog = () => {
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogHeader>
          <Typography variant="h5" className="flex justify-center items-center">
            Thiết lập thông báo
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography variant="h6"> Tên người nhận </Typography>
          <Input
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
              id="temperature"
              label="Thông báo về cảm biến nhiệt độ"
              color="purple"
              defaultChecked={false}
            />
            <Switch
              id="light"
              label="Thông báo về cảm biến ánh sáng"
              color="purple"
              defaultChecked={false}
            />
            <Switch
              id="soilmoisture"
              label="Thông báo về cảm biến độ ẩm đất"
              color="purple"
              defaultChecked={false}
            />
            <Switch
              id="smoke"
              label="Thông báo về cảm biến khói"
              color="purple"
              defaultChecked={false}
            />
            <Switch
              id="infrared"
              label="Thông báo về cảm biến hồng ngoại"
              color="purple"
              defaultChecked={false}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleClose}
            className="mr-1 text-[#667085] hover:bg-gray-300"
          >
            <span> Hủy bỏ </span>
          </Button>
          <Button
            className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700"
            size="lg"
            onClick={handleClose}
          >
            <span> Xác nhận </span>
          </Button>
        </DialogFooter>
      </Dialog>
    );
  };

  const renderHeader = useMemo(
    () => (
      <tr className="text-xs text-[#667085] bg-gray-100 font-normal">
        <th className="p-4">STT</th>
        <th className="p-4">Tên</th>
        <th className="p-4">Số điện thoại</th>
        <th className="p-4"></th>
      </tr>
    ),
    []
  );

  const notificationData: {
    name: string;
    phone: string;
  }[] = [
    {
      name: "Trí mập",
      phone: "0987654321",
    },
    {
      name: "Trí mập",
      phone: "0987654321",
    },
    {
      name: "Trí mập",
      phone: "0987654321",
    },
  ];

  const renderNotification = useMemo(
    () =>
      notificationData.map((item, index) => (
        <tr key={index} className="bg-white text-[#667085] dark:bg-white">
          <td className="px-6 py-2">{index + 1}</td>
          <td className="px-6 py-2">{item.name}</td>
          <td className="px-6 py-2">{item.phone}</td>
          <td className="px-6 py-2">
            <Button
              onClick={handleOpen}
              size="lg"
              className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700"
            >
              Sửa
            </Button>
          </td>
        </tr>
      )),
    [notificationData]
  );

  const data = [
    {
      label: "Mật khẩu",
      value: "password",
      children: (
        <div className="flex justify-center w-full items-center">
          <Card
            className="w-2/3"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
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
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
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
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
              />
            </CardBody>
            <CardFooter
              className="flex items-center justify-center"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <Button
                className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700"
                size="lg"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
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
        <>
          <div className="flex justify-end items-center mb-4">
            <Button
              onClick={handleOpen}
              size="lg"
              className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700"
            >
              Đăng ký
            </Button>
            {renderDialog()}
          </div>
          <div className="flex justify-between items-center mb-2">
            <table className="w-full text-sm text-center text-gray-900 dark:text-gray-400 rounded-lg bg-white overflow-hidden">
              <thead className="text-gray-900 dark:bg-gray-700 dark:text-gray-400">
                {renderHeader}
              </thead>
              <tbody className="font-medium whitespace-nowrap dark:text-white">
                {renderNotification}
              </tbody>
            </table>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="space-y-1 p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>{new Date().toDateString()}</h1>
      </div>
      <Tabs value="password">
        <TabsHeader
          className="w-1/3"
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
            <TabPanel key={value} value={value} className="rounded-lg">
              {children}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </main>
  );
};
