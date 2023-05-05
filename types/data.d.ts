type TSensorStatus = "CONNECTED" | "DISCONNECTED";

type TMonitorSensorType = "temperature" | "humidity" | "light";

interface ISensorData {
  id: number;
  deviceId: string;
  status: TSensorStatus;
  value: string;
  createAt: string;
  updatedAt: string;
}
