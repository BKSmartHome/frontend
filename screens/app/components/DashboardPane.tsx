import SwitchButton from "@components/Switch";
import { LIST_OF_TOPICS } from "@configs/sensor";
import {
  NEXT_PUBLIC_MQTT_CLIENT_ID,
  NEXT_PUBLIC_MQTT_PASSWORD,
  NEXT_PUBLIC_MQTT_URI,
  NEXT_PUBLIC_MQTT_USERNAME,
} from "@env";
import {
  FireIcon,
  LightBulbIcon,
  PowerIcon,
  SunIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { MqttConnectionLayout } from "@layouts/MqttConnectionLayout";
import { cx } from "@utils/tools";
import { MqttClient } from "mqtt";
import Image from "next/image";
import { ReactElement, useCallback, useMemo, useRef, useState } from "react";

interface DashboardDataProps {
  temperature: string;
  light: string;
  humidity: string;
  fire: string;
  detection: string;
  fan: string;
  led: string;
  pump: string;
}

type TDashboardDataKeys = keyof DashboardDataProps;

type TDeviceStatus = "ON" | "OFF";

const SensorReaderComponent: IComponent<{
  className?: string;
  text: string | ReactElement;
  icon: ReactElement;
}> = ({ className, text, icon }) => {
  return (
    <div
      className={cx(
        "flex gap-4 items-center justify-center p-12 shadow-lg rounded-lg",
        className
      )}
    >
      <div>{icon}</div>
      <div className="font-bold text-3xl">{text}</div>
    </div>
  );
};

const DeviceComponent: IComponent<{
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

export const DashboardPane: IComponent = () => {
  const [data, setData] = useState<DashboardDataProps | null>(null);

  const addMessage = (msg: any) => {
    if (msg)
      setData(
        (prev) =>
          ({
            ...prev,
            [msg.topic as TDashboardDataKeys]: msg.payload.toString(),
          } as DashboardDataProps)
      );
  };
  // const clearMessages = () => {
  //   setData(null);
  // };

  const incomingMessageHandler = useRef(
    LIST_OF_TOPICS.map((sensor) => ({
      topic: sensor,
      handler: (msg: any) => {
        addMessage(msg);
      },
    }))
  );

  const [client, setClient] = useState<MqttClient | null>(null);
  const setMqttClient = (client: MqttClient) => {
    setClient(client);
  };

  const publishMessages = (client: any, topic: string, msg: string) => {
    if (!client) {
      console.log("(publishMessages) Cannot publish, mqttClient: ", client);
      return;
    }
    client.publish(topic, msg);
  };

  const mqttConnectionLayoutParams = useMemo(
    () => ({
      uri: NEXT_PUBLIC_MQTT_URI,
      options: {
        username: NEXT_PUBLIC_MQTT_USERNAME,
        password: NEXT_PUBLIC_MQTT_PASSWORD,
        clientId: NEXT_PUBLIC_MQTT_CLIENT_ID,
      },
      topicHandlers: incomingMessageHandler.current,
      onConnectedHandler: (client: any) => setMqttClient(client),
    }),
    []
  );

  const TemperatureComponent = useCallback(() => {
    return (
      <div className="flex gap-8">
        <SensorReaderComponent
          className="grow bg-red-200"
          text={
            data?.temperature ? (
              <span>{data?.temperature.slice(0, 4)}&#8451;</span>
            ) : (
              "NA"
            )
          }
          icon={
            <Image
              alt="temperature"
              src="/Temperature.png"
              width={64}
              height={64}
            />
          }
        />
        <DeviceComponent
          className="grow bg-blue-300"
          name="FAN"
          status={data?.fan === "1" ? "ON" : "OFF"}
          onToggle={() =>
            publishMessages(client, "fan", data?.fan === "1" ? "0" : "1")
          }
          icon={
            <svg
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.4825 22.3722L28.4825 22.3603L17.0451 22.3602L28.0162 18.3959L28.015 18.3926C28.2251 18.3396 28.4425 18.3208 28.6589 18.3369C28.6874 18.3391 28.716 18.3418 28.7444 18.3451L28.7449 18.3452C29.042 18.3802 29.3276 18.4808 29.5812 18.6397L29.5812 18.6397C29.8347 18.7986 30.0498 19.0118 30.2108 19.264L30.2111 19.2644C30.3721 19.5166 30.4751 19.8014 30.5126 20.0983L30.5127 20.0989C30.5502 20.3958 30.5212 20.6974 30.4279 20.9819L30.4278 20.9821C30.3345 21.2666 30.179 21.5267 29.9728 21.7438L29.9726 21.744C29.7665 21.9609 29.5147 22.1293 29.2355 22.237L29.2349 22.2373C29.2087 22.2474 29.1823 22.2569 29.1557 22.2659C28.9388 22.3393 28.7112 22.3752 28.4825 22.3722ZM8.27759 21.2311V26.4013L28.4409 26.4016C29.2067 26.4102 29.9683 26.2732 30.685 25.9967L30.6856 25.9965C31.2311 25.786 31.7417 25.4981 32.2022 25.1429C32.4474 24.9537 32.6784 24.7455 32.8929 24.5197L32.893 24.5195C33.5104 23.8697 33.9756 23.0909 34.2551 22.2392L34.2552 22.239C34.5347 21.3873 34.6216 20.4842 34.5094 19.5949L34.5094 19.5943C34.3972 18.7049 34.0888 17.8517 33.6066 17.0961L33.6063 17.0957C33.1239 16.3401 32.4797 15.7011 31.7202 15.2251L31.7201 15.2251C31.4562 15.0596 31.1806 14.9153 30.896 14.793C30.3617 14.5634 29.7955 14.4114 29.2147 14.3431L29.2142 14.3431C28.3489 14.2414 27.4721 14.328 26.6438 14.5965L26.6432 14.5948L26.5812 14.6172L26.5739 14.6197L26.573 14.6199L26.5731 14.6201L8.27759 21.2311ZM8.27759 38.5433V42.6943L34.9594 52.1867L34.9591 52.1874C35.9247 52.5727 36.9634 52.7402 38.0011 52.678C38.4001 52.6541 38.7952 52.5964 39.1823 52.5062C39.8019 52.3617 40.401 52.1339 40.9628 51.8274C41.8754 51.3294 42.6671 50.6362 43.2812 49.7972C43.8954 48.9582 44.317 47.994 44.516 46.9733C44.715 45.9526 44.6864 44.9006 44.4324 43.8922C44.1783 42.8838 43.7051 41.9439 43.0463 41.1394C42.6408 40.6443 42.1712 40.2079 41.6511 39.8412C41.3263 39.6121 40.9819 39.4102 40.6211 39.2381C39.6843 38.7911 38.6605 38.556 37.6225 38.5494V38.5434L8.27759 38.5433ZM37.5951 42.5847L20.0268 42.5846L36.5321 48.4566L36.5306 48.4607C36.9229 48.6055 37.3413 48.6675 37.7592 48.6424C38.2036 48.6157 38.6366 48.4914 39.0275 48.2781C39.4183 48.0649 39.7573 47.7681 40.0203 47.4088C40.2833 47.0495 40.4638 46.6366 40.549 46.1995C40.6343 45.7624 40.622 45.3119 40.5132 44.8801C40.4045 44.4483 40.2018 44.0458 39.9197 43.7013C39.6376 43.3568 39.283 43.0788 38.8812 42.8871C38.4799 42.6957 38.0415 42.595 37.5969 42.5922L37.5951 42.5922L37.5951 42.5915L37.5951 42.5847ZM46.7028 22.8849L46.701 22.8859L44.7138 19.3674L44.7115 19.3633L44.7155 19.3611C45.7914 18.7538 46.9922 18.4014 48.2256 18.3309C48.4045 18.3207 48.5834 18.3164 48.762 18.3181C49.8163 18.3279 50.8603 18.544 51.8345 18.9561C52.9737 19.438 53.9872 20.1751 54.7969 21.1105C55.6065 22.0459 56.1907 23.1548 56.5044 24.3516C56.8181 25.5485 56.853 26.8014 56.6063 28.0138C56.3597 29.2263 55.8382 30.366 55.0818 31.345C54.4352 32.1822 53.6316 32.8828 52.7179 33.4088C52.563 33.4979 52.4049 33.5821 52.2439 33.661C51.1333 34.2056 49.9124 34.4879 48.6755 34.4862V34.4856H8.27759V30.4447H48.6811L48.6811 30.4403C49.299 30.4412 49.9089 30.3002 50.4637 30.0281C51.0185 29.7561 51.5035 29.3603 51.8813 28.8712C52.2591 28.3821 52.5197 27.8128 52.6429 27.2072C52.7661 26.6015 52.7486 25.9756 52.5919 25.3777C52.4352 24.7799 52.1434 24.226 51.739 23.7587C51.3345 23.2914 50.8283 22.9232 50.2592 22.6825C49.6901 22.4418 49.0733 22.3349 48.4564 22.3702C47.8402 22.4054 47.2403 22.5815 46.7028 22.8849Z"
                fill="white"
              />
            </svg>
          }
        />
      </div>
    );
  }, [data?.temperature, data?.fan, client]);

  const BrightnessComponent = useCallback(() => {
    return (
      <div className="flex gap-8">
        <SensorReaderComponent
          className="grow bg-yellow-800"
          text={data?.light ? <span>{data?.light.slice(0, 4)}</span> : "NA"}
          icon={<SunIcon className="w-16 h-16" color="white" />}
        />

        <DeviceComponent
          className="grow bg-gray-600"
          name="LIGHT"
          status={data?.led === "1" ? "ON" : "OFF"}
          onToggle={() =>
            publishMessages(client, "led", data?.led === "1" ? "0" : "1")
          }
          icon={<LightBulbIcon className="w-12 h-12" color="white" />}
        />
      </div>
    );
  }, [data?.light, data?.led, client]);

  const HumidityComponent = useCallback(() => {
    return (
      <div className="flex gap-8">
        <SensorReaderComponent
          className="grow bg-green-800"
          text={
            data?.humidity ? <span>{data?.humidity.slice(0, 4)}</span> : "NA"
          }
          icon={
            <Image alt="temperature" src="/Garden.png" width={64} height={64} />
          }
        />
        <DeviceComponent
          className="grow bg-teal-600"
          name="PUMP"
          status={data?.pump === "1" ? "ON" : "OFF"}
          icon={<PowerIcon className="w-12 h-12" color="white" />}
          onToggle={() =>
            publishMessages(client, "pump", data?.pump === "1" ? "0" : "1")
          }
        />
      </div>
    );
  }, [data?.humidity, data?.pump, client]);

  const BurnWarning = useMemo(() => {
    return (
      <div
        className={`bg-red-800 rounded-lg flex items-center justify-center h-full gap-2`}
      >
        <div className="wrapper justify-center items-center">
          <FireIcon className="w-16 h-16 text-white" strokeWidth={2} />
          <div className="text-xl font-bold font-sans text-white text-center">
            {data?.fire !== "0" ? "Fire" : "No Fire"}
          </div>
        </div>
      </div>
    );
  }, [data?.fire]);
  const DetectedWarning = useMemo(() => {
    return (
      <div
        className={`bg-detection rounded-lg flex items-center justify-center h-full gap-2`}
      >
        <div className="wrapper">
          {data?.detection && data.detection !== "0" ? (
            <div
              className="flex flex-col
             justify-center items-center"
            >
              <UsersIcon className="text-white w-12 h-12" />
              <div className="text-xl font-bold font-sans text-black">
                Detect some people
              </div>
            </div>
          ) : (
            <Image
              className=""
              src="/Denied.png"
              width={80}
              height={80}
              alt="detection"
            />
          )}
        </div>
      </div>
    );
  }, [data?.detection]);

  return (
    <MqttConnectionLayout {...mqttConnectionLayoutParams}>
      <div className="p-8 h-full">
        <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
          <h1>Smart Home</h1>
          <h1>{new Date().toDateString()}</h1>
        </div>
        <div className="min-h-[60vh] grid grid-cols-3 gap-8">
          <div className="col-span-2  flex flex-col gap-4">
            <div className="">{TemperatureComponent()}</div>
            <div className="">{BrightnessComponent()}</div>
            <div className="grow">{HumidityComponent()}</div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grow">{BurnWarning}</div>
            <div className="grow">{DetectedWarning}</div>
          </div>
        </div>
      </div>
    </MqttConnectionLayout>
  );
};
