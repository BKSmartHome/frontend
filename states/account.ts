import { loginApi } from "@apis/auth";
import { ROUTER } from "@configs/router";
import { ToastTemplate } from "@configs/toast";
import { NextRouter } from "next/router";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAccountState {
  loading: boolean;
  accessToken?: string;
  username?: string;
  handleLogin: (
    username: string,
    password: string,
    router: NextRouter
  ) => Promise<void>;

  handleLogout: () => void;
}

export const useAccountStore = create<IAccountState>()(
  devtools(
    persist(
      (set) => ({
        loading: false,
        handleLogin: async (username, password, router) => {
          set({ loading: true });
          try {
            const res = await loginApi({ username, password });
            if (res.status !== 200) {
              ToastTemplate.fail("Login failed");
            } else if (res.status === 200) {
              if (res.data) {
                set({
                  accessToken: res.data.accessToken,
                  username: res.data.username,
                });
                ToastTemplate.success("Login successfully");
                router.push(ROUTER.app.url);
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
        handleLogout: () => {
          set({ loading: true });
          // window.location.href = ROUTER.login.url;
          set({
            accessToken: undefined,
            username: undefined,
          });
          set({ loading: false });
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
