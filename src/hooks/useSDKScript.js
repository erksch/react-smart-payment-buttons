// @flow
import { useState, useEffect } from 'react';

function useSDKScript(sdkScriptId: ?string) {
  const shouldLoadSDK = !window.paypal && !!sdkScriptId;
  const [isSDKLoaded, setIsSDKLoaded] = useState(!shouldLoadSDK);

  function handleSDKLoad() {
    setIsSDKLoaded(true);
  }

  function mount() {
    if (!shouldLoadSDK || !sdkScriptId || isSDKLoaded) return;

    const script = document.getElementById(sdkScriptId);

    if (script) {
      script.addEventListener('load', handleSDKLoad, false);
    }
  }

  function unmount() {
    if (sdkScriptId) {
      const script = document.getElementById(sdkScriptId);

      if (script) {
        script.removeEventListener('load', handleSDKLoad, false);
      }
    }
  }

  useEffect(() => {
    mount();
    return unmount;
  });

  return {
    isSDKLoaded: shouldLoadSDK ? isSDKLoaded : true,
  };
}

export default useSDKScript;
