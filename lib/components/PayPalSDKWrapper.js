import React from 'react';
import queryString from 'query-string';
import humps from 'humps';
import scriptLoader from 'react-async-script-loader'; // See SDK parameters list:
// https://developer.paypal.com/docs/checkout/reference/customize-sdk/

function PayPalSDKWrapper(wrapperProps) {
  const {
    clientId,
    merchantId,
    intent,
    commit,
    vault,
    components,
    currency,
    disableFunding,
    disableCard,
    integrationDate,
    locale,
    buyerCountry,
    debug
  } = wrapperProps;
  const params = queryString.stringify(humps.decamelizeKeys({
    merchantId,
    intent,
    commit,
    vault,
    components,
    currency,
    integrationDate,
    locale,
    buyerCountry,
    debug,
    clientId: clientId || process.env.REACT_APP_PAYPAL_CLIENT_ID,
    disableFunding: (disableFunding || []).join(','),
    disableCard: (disableCard || []).join(',')
  }, {
    separator: '-'
  }));
  const script = `https://www.paypal.com/sdk/js?${params}`;
  return scriptLoader(script)(function (props) {
    if (wrapperProps.loading && !props.isScriptLoaded) {
      return wrapperProps.loading;
    }

    return wrapperProps.children;
  });
}

export default PayPalSDKWrapper;