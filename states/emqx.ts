import { MqttClient } from "mqtt";
import create from "zustand";

interface IEmqxState {
  client: MqttClient | null;
  setClient: (client: MqttClient) => void;
  publish: (topic: string, message: string) => void;
}

const useMqttStore = create<IEmqxState>((set, get) => ({
  client: null,
  setClient: (client) => set({ client }),
  publish: (topic, message) => {
    get().client?.publish(topic, message);
  },
}));

export { useMqttStore };
