type TAlertStatus = "CONNECTED" | "DISCONNECTED";
interface IAlertData {
  id: number;
  value: string;
  threshold: string;
  status: TAlertStatus;
  createAt: string;
  updatedAt: string;
}
