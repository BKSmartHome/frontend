import { listAllAlertsApi } from "@apis/alerts";
import { ToastTemplate } from "@configs/toast";
import { create } from "zustand";

interface IAlertState {
  loading: boolean;
  alerts?: IAlertData[];
  fetchAllAlerts: (pageId: number, pageSize: number) => Promise<void>;
}

export const useAlertStore = create<IAlertState>()((set) => ({
  loading: false,

  fetchAllAlerts: async (pageId: number, pageSize: number) => {
    set({ loading: true });
    try {
      const res = await listAllAlertsApi(pageId, pageSize);
      if (res.status !== 200) {
        ToastTemplate.fail("Failed to fetch data");
      } else if (res.status === 200) {
        if (res.data) {
          set({ alerts: res.data });
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
