import React from "react";
import Image from "next/image";
import styles from "../../styles/dashboard.module.css";

export const DashboardPane: IComponent = () => {
    const temperature = () => {
        return (
            <div className={styles.rectangle + " " + styles.bgTemperature}>
                <div className={styles.centerRec}>
                    <Image className="" src="/Temperature.png" width={80} height={80}></Image>
                    <p className="text-4xl font-bold font-sans">28&#186;C</p>
                </div>
            </div>
        );
    }

    const brightness = () => {
        return (
            <div className={styles.rectangle + " " + styles.bgBrightness}>
                <div className={styles.centerRec}>
                    <Image className="" src="/Light.png" width={80} height={80}></Image>
                    <p className="text-4xl font-bold font-sans text-black">28%</p>
                </div>
            </div>
        );
    }

    const humidityLow = () => {
        return (
            <div className={styles.rectangle + " " + styles.bgHumidityLow}>
                <div className={styles.centerRec + " " + "mt-12"}>
                    <Image className="" src="/Plant.png" width={80} height={80}></Image>
                    <p className="text-4xl font-bold font-sans">28%</p>
                </div>
                <div className={styles.centerRec}>
                    <Image className="" src="/Error.png" width={40} height={20}></Image>
                    <p className="text-lg font-bold font-sans">Low</p>
                </div>
            </div>
        );
    }

    const humidityHigh = () => {
        return (
            <div className={styles.rectangle + " " + styles.bgHumidityHigh}>
                <div className={styles.centerRec + " " + "mt-12"}>
                    <Image className="" src="/Plant.png" width={80} height={80}></Image>
                    <p className="text-4xl font-bold font-sans">78%</p>
                </div>
                <div className={styles.centerRec}>
                    <Image className="" src="/Garden.png" width={30} height={20}></Image>
                    <p className="text-lg font-bold font-sans">High</p>
                </div>
            </div>
        );
    }

    const warningBurn = () => {
        return (
            <div className={styles.rectangleBurnDetection + " " + styles.bgWarningBurn}>
                <div className="mt-2 ml-2">
                    <Image className="float-left" src="/Fire.png" width={60} height={60}></Image>
                </div>
                <div className={styles.centerRec + " " + "mb-16"}>
                    <p className="text-4xl font-bold font-sans text-black">No error</p>
                </div>
            </div>
        );
    }

    const realizePerson = () => {
        return (
            <div className={styles.rectangleBurnDetection + " " + styles.bgRealizePerson}>
                <div className="mt-2 ml-2">
                    <Image className="float-left" src="/Denied.png" width={60} height={60}></Image>
                </div>
                <div className={styles.centerRec + " " + "mb-16"}>
                    <p className="text-4xl font-bold font-sans text-white">No detection</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
                <h1>Smart Home</h1>
                <h1>10:06 AM, Mar 2 2023</h1>
            </div>
            <div className="flex">
                {temperature()}
                <span className="mx-2.5"></span>
                {brightness()}
                <span className="mx-2.5"></span>
                {humidityLow()}
            </div>
            <div className="flex">
                {warningBurn()}
                <span className="mx-2.5"></span>
                {realizePerson()}
            </div>
        </div>
    );
}