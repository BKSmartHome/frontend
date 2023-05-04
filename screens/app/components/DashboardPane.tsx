import { HUMIDITY_THRESHOLD } from "@configs/app";
import { Switch } from "@material-tailwind/react";
import { cx } from "@utils/tools";
import { connect, MqttClient } from "mqtt";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import styles from "./styles.module.scss";

interface DashboardDataProps {
  temperature: number;
  light: string;
  humidity: number;
  burn: string;
  detection: string;
}

const wrapperStyles =
  "rounded-lg flex items-center justify-center h-full gap-2";

export const DashboardPane: IComponent = () => {
  const [data, setData] = useState<DashboardDataProps | null>(null);

  const [toggleFan, setFan] = useState<TFanStatus>("OFF");
  const [toggleLight, setLight] = useState<TLightStatus>("OFF");
  const [toggleWatering, setWatering] = useState<TWateringStatus>("OFF");

  const [client, setClient] = useState<MqttClient | null>(null);
  const [payload, setPayload] = useState({});

  const host = "127.0.0.1";
  const port = "8083";
  const connectUrl = `ws://${host}:${port}/mqtt`;

  const mqttConnect = (host: string, mqttOption: any) => {
    setClient(connect(host, mqttOption));
  };

  useEffect(() => {
    const initialData: DashboardDataProps = {
      temperature: 28,
      light: "28%",
      humidity: 0.68,
      burn: "No error",
      detection: "No detection",
    };
    setData(initialData);
  }, []);

  useEffect(() => {
    const options = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
      clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
      username: "root",
      password: "secret",
    };

    mqttConnect(connectUrl, options);
  }, []);

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on("connect", () => {
        console.log("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        console.log("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
        console.log(payload);
      });
    }
  }, [client]);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  const TemperatureComponent = useMemo(() => {
    return (
      <div className={`bg-temperature ${wrapperStyles}`}>
        <div className="wrapper">
          <Image
            className=""
            src="/Temperature.png"
            width={80}
            height={80}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-4xl font-bold font-sans">
          {data?.temperature}&#186;C
        </div>

        <div className="vertical-line h-40 border-2 border-silver border-solid mr-7"></div>

        <div>{`${status}`}</div>
        <div>
          <div className="text-center">
            <Image
              alt="fan"
              src="/FanSpeed.png"
              width={120}
              height={120}
            ></Image>
          </div>
          <div className="flex items-center justify-center">
            <Switch
              value={toggleFan}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onChange={(e) => {
                setFan((prev) => (prev === "ON" ? "OFF" : "ON"));
              }}
            />
          </div>
        </div>
      </div>
    );
  }, [data]);

  const BrightnessComponent = useMemo(() => {
    return (
      <div className={`bg-light ${wrapperStyles}`}>
        <div className="wrapper">
          <Image
            className=""
            src="/Light.png"
            width={80}
            height={80}
            alt="brightness"
          ></Image>
        </div>
        <div className="text-4xl font-bold font-sans text-black">
          {data?.light}
        </div>

        <div className="vertical-line h-40 border-2 border-black border-solid mr-7"></div>

        <div>
          <div className="text-center">
            <Image
              alt="chandelier"
              src="/Chandelier.png"
              width={120}
              height={120}
            ></Image>
          </div>
          <div className="flex items-center justify-center">
            <Switch
              value={toggleLight}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onChange={(e) => {
                setLight((prev) => (prev === "ON" ? "OFF" : "ON"));
              }}
            />
          </div>
        </div>
      </div>
    );
  }, [data]);

  const HumidityComponent = useMemo(() => {
    const status = data && data?.humidity < HUMIDITY_THRESHOLD ? "Low" : "High";
    return (
      <div
        className={`${
          status === "Low" ? "bg-humidityLow" : "bg-humidityHigh"
        } rounded-lg h-full flex items-center justify-center`}
      >
        <div className="mr-7">
          <div className="flex items-center justify-center gap-2">
            <div className="wrapper">
              <Image
                className=""
                src="/Plant.png"
                width={80}
                height={80}
                alt="plant"
              ></Image>
            </div>
            {data?.humidity && (
              <div className="text-4xl font-bold font-sans">
                {data?.humidity * 100} %
              </div>
            )}
          </div>
          <div className="text-center flex justify-center">
            {
              <Image
                alt="plant"
                src={`${status === "Low" ? "/Error.png" : "/Garden.png"}`}
                width={60}
                height={60}
              />
            }
            <p className="text-lg font-bold font-sans">{}</p>
          </div>
        </div>

        <div className="vertical-line h-40 border-2 border-white border-solid mr-14"></div>

        <div>
          <div className="text-center">
            <Image
              alt="irrigation"
              src="/Irrigation.png"
              width={120}
              height={120}
            ></Image>
          </div>
          <div className="flex items-center justify-center">
            <Switch
              value={toggleWatering}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onChange={(e) => {
                setLight((prev) => (prev === "ON" ? "OFF" : "ON"));
              }}
            />
          </div>
        </div>
      </div>
    );
  }, [data]);

  const BurnWarning = useMemo(() => {
    return (
      <div className={`bg-burn ${wrapperStyles}`}>
        <div className="wrapper">
          <Image
            className=""
            src="/Fire.png"
            width={80}
            height={80}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-4xl font-bold font-sans text-black">
          {data?.burn}
        </div>
      </div>
    );
  }, [data]);
  const DetectedWarning = useMemo(() => {
    return (
      <div className={`bg-detection ${wrapperStyles}`}>
        <div className="wrapper">
          <Image
            className=""
            src="/Denied.png"
            width={80}
            height={80}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-4xl font-bold font-sans text-black">
          {data?.detection}
        </div>
      </div>
    );
  }, [data]);

  return (
    <div className="p-8 h-full">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>
      <div className="min-h-[60vh] grid grid-rows-2 gap-8">
        <div className="flex gap-8">
          <div className="grow">{TemperatureComponent}</div>
          <div className="grow">{BrightnessComponent}</div>
          
        </div>
        <div className="flex gap-8">
          <div className="grow">{HumidityComponent}</div>
          <div className="grow">{BurnWarning}</div>
          <div className="grow">{DetectedWarning}</div>
        </div>
      </div>
    </div>
  );
};
