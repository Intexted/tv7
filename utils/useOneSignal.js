import { useEffect } from "react";

const useOneSignal = () =>
  useEffect(() => {
    if (typeof window !== undefined) {
      window.OneSignal = window.OneSignal || [];
      OneSignal.push(function () {
        OneSignal.init({
          appId: "1f26c530-1bc0-4b09-a468-44734c8b116c",
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
