import { listAllDataApi } from "@apis/data";
import { ToastTemplate } from "@configs/toast";
import { create } from "zustand";

interface ISensorDataState {
  loading: boolean;
  data: { [key in TMonitorSensorType]: ISensorData[] };
  fetchAllSensorData: (type: string, from: string, to: string) => Promise<void>;
}

export const useSensorDataStore = create<ISensorDataState>()((set, get) => ({
  loading: false,
  data: {
    temperature: [],
    humidity: [],
    light: [],
  },
  fetchAllSensorData: async (type: string, from: string, to: string) => {
    set({ loading: true });
    try {
      const res = await listAllDataApi(type, from, to);
      if (res.status !== 200) {
        ToastTemplate.fail("Failed to fetch data");
      } else if (res.status === 200) {
        if (res.data) {
          set({ data: { ...get().data, [type]: res.data } });
          set({ loading: false });
          return;
        }
      }
    } catch (e) {
      ToastTemplate.unknown();
      set({ loading: false });
    }
    set({ loading: false });
  },
}));
