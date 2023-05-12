import {
  createReceiverApi,
  deleteReceiverApi,
  listAllReceiversApi,
} from "@apis/receivers";
import { LoadableButton } from "@components/LoadableButton";
import { ToastTemplate } from "@configs/toast";
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
import { useCallback, useEffect, useMemo, useState } from "react";

export const SettingPane: IComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [receivers, setReceivers] = useState<IReceiver[] | null>(null);
  const [inputProps, setInputProps] = useState<{
    name: string;
    email: string;
  }>({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await listAllReceiversApi();
      if (res.status !== 200) {
        throw new Error("Error");
      }
      res.data && setReceivers(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [setReceivers]);

  const handleCreateNewReceiver = async () => {
    setLoading(true);
    try {
      const res = await createReceiverApi(inputProps);
      if (res.status !== 200) {
        throw new Error("Error");
      }
      if (res.data) {
        handleClose();
        ToastTemplate.success("Tạo mới người nhận thành công");
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleDeleteReceiver = useCallback(
    async (name: string) => {
      setLoading(true);
      try {
        const res = await deleteReceiverApi(name);
        if (res.status !== 200) {
          throw new Error("Error");
        }
        if (res.data) {
          handleClose();
          ToastTemplate.success("Xóa người nhận thành công");
          fetchData();
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    },
    [setLoading, fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderDialog = () => {
    return (
      <Dialog
        open={isOpen}
        handler={handleClose}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <DialogHeader
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Typography variant="h5" className="flex justify-center items-center">
            Thiết lập thông báo
          </Typography>
        </DialogHeader>
        <DialogBody
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Typography variant="h6"> Tên người nhận </Typography>
          <Input
            type="text"
            label="Nhập tên người nhận"
            className={"rounded-md"}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            value={inputProps.name}
            onChange={(e) =>
              setInputProps({ ...inputProps, name: e.target.value })
            }
          />
          <Typography variant="h6" className="pt-3">
            {" "}
            Email người nhận{" "}
          </Typography>
          <Input
            type="mail"
            label="Nhập email người nhận"
            className="rounded-md"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            value={inputProps.email}
            onChange={(e) =>
              setInputProps({ ...inputProps, email: e.target.value })
            }
          />
          <Typography variant="h6" className="pt-3">
            {" "}
            Loại thông báo{" "}
          </Typography>
          <div className="space-y-3 pt-2 flex flex-col">
            <Switch
              id="temperature"
              label="Thông báo về cảm biến nhiệt độ"
              color="indigo"
              defaultChecked={true}
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            />
            <Switch
              id="light"
              label="Thông báo về cảm biến ánh sáng"
              color="indigo"
              defaultChecked={true}
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            />
            <Switch
              id="humidity"
              label="Thông báo về cảm biến độ ẩm đất"
              color="indigo"
              defaultChecked={true}
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            />
            <Switch
              id="smoke"
              label="Thông báo về cảm biến khói"
              color="indigo"
              defaultChecked={true}
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            />
            <Switch
              id="infrared"
              label="Thông báo về cảm biến hồng ngoại"
              color="indigo"
              defaultChecked={true}
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            />
          </div>
        </DialogBody>
        <DialogFooter
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Button
            variant="text"
            onClick={handleClose}
            className="mr-1 text-[#667085] hover:bg-gray-300"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <span> Hủy bỏ </span>
          </Button>
          <LoadableButton
            className="py-2 px-4 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-500"
            size="lg"
            loading={loading}
            onClick={() => handleCreateNewReceiver()}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <span> Xác nhận </span>
          </LoadableButton>
        </DialogFooter>
      </Dialog>
    );
  };

  const renderHeader = useMemo(
    () => (
      <tr className="text-lg text-[#667085] bg-gray-100 font-normal">
        <th className="p-4">STT</th>
        <th className="p-4">Tên</th>
        <th className="p-4">Email</th>
        <th className="p-4"></th>
      </tr>
    ),
    []
  );

  const renderNotification = useMemo(
    () =>
      receivers?.map((item, index) => (
        <tr key={index} className="bg-white text-[#667085] dark:bg-white !py-4">
          <td className="px-6 py-6 text-lg">{index + 1}</td>
          <td className="px-6 py-6 text-lg">{item.name}</td>
          <td className="px-6 py-6 text-lg">{item.email}</td>
          <td className="px-6 py-6 text-lg flex justify-center">
            <LoadableButton
              onClick={() => handleDeleteReceiver(item.name)}
              size="lg"
              loading={loading}
              className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-400"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              Xóa
            </LoadableButton>
          </td>
        </tr>
      )),
    [receivers, handleDeleteReceiver, loading]
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
                label="Nhập mật khẩu cũ"
              />
              <Typography variant="h6" className="pt-3">
                {" "}
                Mật khẩu mới{" "}
              </Typography>
              <Input
                type="text"
                label="Nhập mật khẩu mới"
                className="rounded-md"
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
                label="Nhập lại mật khẩu mới"
                className="rounded-md"
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
                className="py-2 px-4 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-700"
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
              className="py-2 px-4 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-500"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
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
