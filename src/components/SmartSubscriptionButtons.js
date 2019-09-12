// @flow
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import useSDKScript from '../hooks/useSDKScript';

type Props = {
  containerStyle?: Object,
  containerClassName?: string,
  refresh?: mixed,
  sdkScriptId?: string,
  loading?: React$Node,
  // smart payment buttons props
  createSubscription: (data: any, actions: any) => any,
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

function SmartSubscriptionButtons(props: Props) {
  const {
    containerStyle,
    containerClassName,
    refresh,
    sdkScriptId,
    loading,
    ...buttonsConfig
  } = props;

  const { isSDKLoaded } = useSDKScript(sdkScriptId);

  useEffect(() => {
    if (isSDKLoaded) {
      window.paypal
        .Buttons(buttonsConfig)
        .render('#SmartSubscriptionButtons');
    }
  }, [refresh, isSDKLoaded]);

  if (!isSDKLoaded && loading) {
    return loading;
  }

  return (
    <div
      id="SmartSubscriptionButtons"
      key={`SmartSubscriptionButtons-${JSON.stringify(refresh) || ''}`}
      style={props.containerStyle}
      className={props.containerClassName}
    />
  );
}

SmartSubscriptionButtons.defaultProps = {
  onCancel: () => {},
  onError: () => {},
  style: {},
  containerStyle: {},
  containerClassName: '',
};

export default React.memo<Props>(SmartSubscriptionButtons);
