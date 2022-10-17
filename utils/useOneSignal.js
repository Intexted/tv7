import { useEffect } from "react";

const useOneSignal = () =>
  useEffect(() => {
    if (typeof window !== undefined) {
      window.OneSignal = window.OneSignal || [];
      OneSignal.push(function () {
        OneSignal.init({
          appId: "332a7401-c0ab-4648-b07a-e9a02a220626",
          notifyButton: {
            enable: true,
          },
        });
      });
    }
    return () => {
      window.OneSignal = undefined;
    };
  }, []);

export default useOneSignal;
