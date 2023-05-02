import { listAllDataApi } from "@apis/data";
import { ToastTemplate } from "@configs/toast";
import create from "zustand";

interface ISensorDataState {
  loading: boolean;
  data?: ISensorData[];
  fetchAllSensorData: (pageId: number, pageSize: number) => Promise<void>;
}

export const useSensorDataStore = create<ISensorDataState>()((set) => ({
  loading: false,
  fetchAllSensorData: async (pageId: number, pageSize: number) => {
    set({ loading: true });
    try {
      const res = await listAllDataApi(pageId, pageSize);
      if (res.status !== 200) {
        ToastTemplate.fail("Failed to fetch data");
      } else if (res.status === 200) {
        if (res.data) {
          set({
            data: res.data,
          });
          ToastTemplate.success("Successfully fetched data");
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
