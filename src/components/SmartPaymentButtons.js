// @flow
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';

type Props = {
  containerStyle?: Object,
  containerClassName?: string,
  refresh?: mixed,
  sdkScriptId?: string,
  loading?: React$Node,
  // smart payment buttons props
  createOrder: (data: any, actions: any) => any,
  onApprove: (data: any, actions: any) => any,
  onCancel?: (data: any) => void,
  onError?: (error: any) => void,
  style?: {
    layout: 'vertical' | 'horizontal',
    color: 'gold' | 'blue' | 'silver',
    shape: 'rect' | 'pill',
    height: number,
    label: 'paypal' | 'checkout' | 'pay' | 'installment',
    tagline: boolean,
  },
};

function SmartPaymentButtons(props: Props) {
  const {
    containerStyle,
    containerClassName,
    refresh,
    sdkScriptId,
    loading,
    ...buttonsConfig
  } = props;

  const [isLoadingScript, setIsLoadingScript] = useState(!!sdkScriptId);

  function renderButtons() {
    window.paypal
      .Buttons(buttonsConfig)
      .render('#SmartPaymentButtons');
  }

  function handleSDKLoad() {
    setIsLoadingScript(false);
    renderButtons();
  }

  useEffect(() => {
    if (!window.paypal && sdkScriptId) {
      const script = document.getElementById(sdkScriptId);

      if (script) {
        setIsLoadingScript(true);
        script.addEventListener('load', handleSDKLoad, false);
      }
    } else {
      renderButtons();
    }

    return () => {
      if (sdkScriptId) {
        const script = document.getElementById(sdkScriptId);

        if (script) {
          script.removeEventListener('load', handleSDKLoad, false);
        }
      }
    };
  }, [refresh]);

  if (isLoadingScript) {
    return loading || null;
  }

  return (
    <div
      id="SmartPaymentButtons"
      key={`SmartPaymentButtons-${JSON.stringify(refresh) || ''}`}
      style={props.containerStyle}
      className={props.containerClassName}
    />
  );
}

SmartPaymentButtons.defaultProps = {
  onCancel: () => {},
  onError: () => {},
  style: {},
  containerStyle: {},
  containerClassName: '',
};

export default React.memo<Props>(SmartPaymentButtons);
