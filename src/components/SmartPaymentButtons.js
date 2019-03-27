// @flow
import React, { useEffect } from 'react';

type Props = {
  containerStyle?: Object,
  containerClassName?: string,
  refresh?: mixed,
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
    ...buttonsConfig
  } = props;

  useEffect(() => {
    window.paypal
      .Buttons(buttonsConfig)
      .render('#SmartPaymentButtons');
  }, [refresh]);

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
  refresh: undefined,
};

export default React.memo<Props>(SmartPaymentButtons);
