import { Switch } from "@material-tailwind/react";
import { cx } from "@utils/tools";
import { connect, MqttClient } from "mqtt";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import styles from "./styles.module.scss";

export const ControlPane: IComponent = () => {
  const [toggleFan, setFan] = useState<TFanStatus>("OFF");
  const [client, setClient] = useState<MqttClient | null>(null);
  const [payload, setPayload] = useState({});

  const host = "127.0.0.1";
  const port = "8083";
  const connectUrl = `ws://${host}:${port}/mqtt`;

  const mqttConnect = (host: string, mqttOption: any) => {
    setClient(connect(host, mqttOption));
  };
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

  const FanController = useMemo(() => {
    return (
      <div className="bg-temperature h-full rounded-lg flex items-center justify-center">
        <div>{`Status: ${status}`}</div>
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
  }, []);

  const LightController = useMemo(() => {
    return (
      <div className="bg-light h-full rounded-lg flex items-center justify-center">
        <div>
          <div className="text-center">
            <Image
              alt="fan"
              src="/Chandelier.png"
              width={120}
              height={120}
            ></Image>
          </div>
          <div className="flex items-center justify-center">
            <label className={cx(styles.switch, "")}>
              <input type="checkbox" />
              <span className={styles.slider + " " + styles.round}></span>
            </label>
          </div>
        </div>
      </div>
    );
  }, []);

  const WateringController = useMemo(() => {
    const status = "Low";
    return (
      <div className="bg-humidityLow w-[50%] rounded-lg h-full flex gap-8 items-center justify-center ">
        <div className="">
          <div className="text-center">
            <Image
              alt="irrigation"
              src="/Irrigation.png"
              width={120}
              height={120}
            ></Image>
          </div>
          <div className="flex items-center justify-center">
            <div className="inline-flex text-center">
              <Image alt="err" src="/Error.png" width={60} height={40}></Image>
            </div>
            <p className="text-2xl font-bold">{status}</p>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>

      <div className="min-h-[60vh] grid grid-rows-2 gap-8 ">
        <div className="flex gap-8 mt-8">
          <div className="grow">{FanController}</div>
          <div className="grow">{LightController}</div>
        </div>
        <div className="flex items-center justify-center">
          {WateringController}
        </div>
      </div>
    </div>
  );
};
