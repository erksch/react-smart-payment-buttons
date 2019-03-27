import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

function SmartPaymentButtons(props) {
  const {
    style,
    createOrder,
    onApprove,
    onCancel,
    onError
  } = props;
  useEffect(() => {
    window.paypal.Buttons({
      style,
      createOrder,
      onApprove,
      onCancel,
      onError
    }).render('#SmartPaymentButtons');
  }, [props.refresh]);
  return React.createElement("div", {
    id: "SmartPaymentButtons",
    key: JSON.stringify(props.refresh)
  });
}

export default SmartPaymentButtons;