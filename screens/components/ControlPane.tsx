import { ChandelierSVG } from "@components/SVGIcons/ChandelierSVG";
import { FanSVG } from "@components/SVGIcons/FanSVG";
import { WarningHighSVG } from "@components/SVGIcons/WarningHighSVG";
import { WarningSVG } from "@components/SVGIcons/WarningSVG";
import { WateringSVG } from "@components/SVGIcons/WateringSVG";
import React from "react";

import styles from "../../styles/control.module.scss";

export const ControlPane: IComponent = () => {
  const fanDivice = () => {
    return (
      <div className={styles.rectangle + " " + styles.bgFan}>
        <FanSVG className={styles.images} width="70%" height="70%" />
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
        <ChandelierSVG className={styles.images} width="70%" height="70%" />
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
        <WateringSVG className={styles.images} width="70%" height="70%" />
        <div className={styles.wateringWarningText}>
          <WarningSVG className={styles.images} width="15%" height="15%" />
          <p>Low</p>
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
        <WateringSVG className={styles.images} width="70%" height="70%" />
        <div className={styles.wateringWarningText}>
          <WarningHighSVG className={styles.images} width="15%" height="15%" />
          <p>Watering</p>
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
      <div className={styles.rowFeatureCenter}>{wateringWarningLow()}</div>
    </div>
  );
};
