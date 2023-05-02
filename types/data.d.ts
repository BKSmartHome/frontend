type TSensorStatus = "CONNECTED" | "DISCONNECTED";
interface ISensorData {
  id: number;
  deviceId: string;
  status: TSensorStatus;
  value: string;
  createAt: string;
  updatedAt: string;
}
