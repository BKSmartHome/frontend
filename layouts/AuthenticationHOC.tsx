import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { ROUTER } from "@configs/router";
import { useAccountStore } from "@states/account";
import { getExpiredTimeFromAccessToken } from "@utils/auth";
import { checkExpiredToken } from "@utils/tools";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { TransitionLayout } from "./TransitionLayout";

export const AuthenticationHOC: IComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { accessToken, handleLogout } = useAccountStore();
  const router = useRouter();

  const preCheck = useCallback(async () => {
    const isLoginPage = router.pathname === ROUTER.login.url;

    if (!accessToken) {
      if (!isLoginPage) {
        router.push(ROUTER.login.url);
      }
      setLoading(false);
      return;
    }

    try {
      const { expiredAt } = await getExpiredTimeFromAccessToken(accessToken);
      if (checkExpiredToken(expiredAt)) {
        handleLogout();
        if (!isLoginPage) {
          router.push(ROUTER.login.url);
        }
        setLoading(false);

        return;
      }
    } catch (e) {
      if (!isLoginPage) {
        router.push(ROUTER.login.url);
        setLoading(false);
      }
      return;
    }
    setLoading(false);
  }, [accessToken, handleLogout, router]);

  useEffect(() => {
    preCheck();
  }, [preCheck]);

  return (
    <TransitionLayout location={loading ? "load" : "loaded"}>
      <>
        {loading && (
          <div className="xyz-in w-screen h-screen flex justify-center items-center gap-3">
            <LoadingSVG width={32} height={32} />
            <span className="animate-pulse">Loading, please wait...</span>
          </div>
        )}
        {!loading && (
          <div className="xyz-in absolute top-0 left-0 w-full h-full">
            {children}
          </div>
        )}
      </>
    </TransitionLayout>
  );
};
