import { ROUTER } from "@configs/router";
import { useRouter } from "next/router";

import { TransitionLayout } from "./TransitionLayout";

export const PublicLayout: IComponent = ({ children }) => {
  const router = useRouter();
  const handlePressLogo = () => {
    router.push(ROUTER.login.url);
  };
  return (
    <div className="h-full w-full flex flex-col bg-gray-100 font-serif">
      <div className="w-full h-fit py-4 bg-white border-b flex items-center px-6 gap-2 justify-between">
        <div>
          <button
            onClick={handlePressLogo}
            className="py-4 bg-transparent outline-none hover:opacity-60 active:opacity-100 duration-100 transition-all"
          >
            <h1 className="text-2xl font-bold">SMART HOME IOT</h1>
          </button>
        </div>
      </div>
      <div className="flex-auto">
        <TransitionLayout location={router.pathname}>
          <>{children}</>
        </TransitionLayout>
      </div>
    </div>
  );
};
