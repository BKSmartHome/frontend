interface IAlertData {
  id: number;
  type: string;
  value?: string;
  threshold?: string;
  createdAt: string;
}

interface IReceiver {
  name: string;
  email: string;
}
