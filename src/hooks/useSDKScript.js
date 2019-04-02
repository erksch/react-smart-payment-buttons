// @flow
import { useState, useEffect } from 'react';

function useSDKScript(sdkScriptId: ?string) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(!sdkScriptId);

  function handleSDKLoad() {
    setIsSDKLoaded(true);
  }

  useEffect(() => {
    if (!window.paypal && sdkScriptId && !isSDKLoaded) {
      const script = document.getElementById(sdkScriptId);

      if (script) {
        script.addEventListener('load', handleSDKLoad, false);
      }
    }

    return () => {
      if (sdkScriptId) {
        const script = document.getElementById(sdkScriptId);

        if (script) {
          script.removeEventListener('load', handleSDKLoad, false);
        }
      }
    };
  }, [isSDKLoaded]);

  return { isSDKLoaded };
}

export default useSDKScript;
