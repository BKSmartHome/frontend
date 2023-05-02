import { ProfileComponent } from "@components/ProfileComponent";
import { ROUTER } from "@configs/router";
import { useAccountStore } from "@states/account";
import { useRouter } from "next/router";

import { TransitionLayout } from "./TransitionLayout";

export const PrivateLayout: IComponent = ({ children }) => {
  const router = useRouter();
  const { username } = useAccountStore();
  const handlePressLogo = () => {
    router.push(ROUTER.app.url);
  };

  return (
    <div className="private-layout h-full w-full flex flex-col font-serif">
      <div className="bg-gray-50 w-full h-fit py-3 border-b flex items-center px-6 pr-12 gap-2 justify-between">
        <div>
          <button
            onClick={handlePressLogo}
            className="py-4 bg-transparent outline-none hover:opacity-60 active:opacity-100 duration-100 transition-all"
          >
            <h1 className="text-2xl font-bold">SMART HOME IOT</h1>
          </button>
        </div>
        {username && (
          <div className="flex items-center gap-8">
            <ProfileComponent />
          </div>
        )}
      </div>
      <div className="flex-auto bg-gray-50">
        <>{children}</>
      </div>
    </div>
  );
};
