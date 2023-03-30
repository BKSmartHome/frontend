import Image from "next/image";
import React from "react";

import styles from "../../styles/control.module.css";

export const ControlPane: IComponent = () => {
  const fanDivice = () => {
    return (
      <div className={styles.rectangle + " " + styles.bgFan}>
        <div className="text-center">
          <Image src="/FanSpeed.png" width={120} height={120}></Image>
        </div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider + " " + styles.round}></span>
        </label>
      </div>
    );
  };

  const chandelierDivice = () => {
    return (
      <div className={styles.rectangle + " " + styles.bgChandelier}>
        <div className="text-center">
          <Image src="/Chandelier.png" width={120} height={120}></Image>
        </div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider + " " + styles.round}></span>
        </label>
      </div>
    );
  };

  const wateringWarningLow = () => {
    return (
      <div
        className={
          styles.rectangle +
          " " +
          styles.bgWateringWarrningLow +
          " " +
          styles.rectangleCenter
        }
      >
        <div className="text-center">
          <Image src="/Irrigation.png" width={120} height={120}></Image>
        </div>
        <div className={styles.wateringWarningText}>
          <div className="inline-flex text-center mt-5">
            <Image src="/Error.png" width={40} height={20}></Image>
            <p className="text-lg">Low</p>
          </div>
        </div>
      </div>
    );
  };

  const wateringWarningHigh = () => {
    return (
      <div
        className={
          styles.rectangle +
          " " +
          styles.bgWateringWarrningHigh +
          " " +
          styles.rectangleCenter
        }
      >
        <div className="text-center">
          <Image src="/Irrigation.png" width={120} height={120}></Image>
        </div>
        <div className={styles.wateringWarningText}>
          <div className="inline-flex text-center mt-5">
            <Image src="/Garden.png" width={40} height={20}></Image>
            <p className="text-lg">Watering</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>
      <div className={styles.rowFeature}>
        {fanDivice()}
        <span className={styles.whiteSpace}></span>
        {chandelierDivice()}
      </div>
      <div className={styles.rowFeatureCenter}>{wateringWarningHigh()}</div>
    </div>
  );
};
