import { HUMIDITY_THRESHOLD } from "@configs/app";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface DashboardDataProps {
  temperature: number;
  light: string;
  humidity: number;
  burn: string;
  detection: string;
}

const wrapperStyles =
  "rounded-lg flex items-center justify-center h-full gap-4";

export const DashboardPane: IComponent = () => {
  const [data, setData] = useState<DashboardDataProps | null>(null);
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

  const TemperatureComponent = useMemo(() => {
    return (
      <div className={`bg-temperature ${wrapperStyles}`}>
        <div className="wrapper">
          <Image
            className=""
            src="/Temperature.png"
            width={100}
            height={100}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-5xl font-bold font-sans">
          {data?.temperature}&#186;C
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
            width={100}
            height={100}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-5xl font-bold font-sans text-black">
          {data?.light}
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
        <div>
          <div className="flex items-center justify-center gap-4">
            <div className="wrapper">
              <Image
                className=""
                src="/Plant.png"
                width={100}
                height={100}
                alt="plant"
              ></Image>
            </div>
            {data?.humidity && (
              <div className="text-5xl font-bold font-sans">
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
            width={100}
            height={100}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-5xl font-bold font-sans text-black">
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
            width={100}
            height={100}
            alt="temperature"
          ></Image>
        </div>
        <div className="text-5xl font-bold font-sans text-black">
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
          <div className="grow">{HumidityComponent}</div>
        </div>
        <div className="flex gap-8">
          <div className="grow">{BurnWarning}</div>
          <div className="grow">{DetectedWarning}</div>
        </div>
      </div>
    </div>
  );
};
