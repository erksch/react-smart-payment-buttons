// @flow
import React, { useEffect } from 'react';
import queryString from 'query-string';

type Props = {
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
    style,
    createOrder,
    onApprove,
    onCancel,
    onError,
  } = props;

  useEffect(() => {
    window.paypal.Buttons({
      style, createOrder, onApprove, onCancel, onError,
    }).render('#SmartPaymentButtons');
  }, [props.refresh]);

  return (
    <div
      id="SmartPaymentButtons"
      key={JSON.stringify(props.refresh)}
    />
  );
}

SmartPaymentButtons.defaultProps = {
  onCancel: () => {},
  onError: () => {},
  style: {},
  refresh: false,
};

export default React.memo<Props>(SmartPaymentButtons);
