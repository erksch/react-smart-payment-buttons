// @flow
import React, { Fragment } from 'react';
import queryString from 'query-string';
import humps from 'humps';
import scriptLoader from 'react-async-script-loader';

// See SDK parameters list:
// https://developer.paypal.com/docs/checkout/reference/customize-sdk/

type Props = {
  clientId: string,
  merchantId?: string,
  intent?: 'capture' | 'authorize',
  commit?: boolean,
  vault?: boolean,
  components?: string,
  currency?: string,
  disableFunding?: Array<'credit' | 'card' | 'sepa'>,
  disableCard?: Array<'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'elo' | 'hiper'>,
  integrationDate?: string,
  locale?: string,
  buyerCountry?: string,
  debug: boolean,
  loading?: React$Node,
  children: React$ComponentType<{}>,
};

function PayPalSDKWrapper(wrapperProps: Props) {
  const {
    clientId, merchantId, intent, commit, vault,
    components, currency, disableFunding, disableCard,
    integrationDate, locale, buyerCountry, debug,
  } = wrapperProps;

  const params = queryString.stringify(humps.decamelizeKeys({
    merchantId, intent, commit, vault, components,
    currency, integrationDate, locale, buyerCountry, debug,

    clientId: clientId || process.env.REACT_APP_PAYPAL_CLIENT_ID,
    disableFunding: disableFunding && disableFunding.join(','),
    disableCard: disableCard && disableCard.join(','),
  }, { separator: '-' }));

  const script = `https://www.paypal.com/sdk/js?${params}`;

  const Component = scriptLoader(script)(function (props) {
    if (wrapperProps.loading && !props.isScriptLoaded) {
      return wrapperProps.loading;
    }

    return wrapperProps.children;
  });

  return <Component />;
}

export default PayPalSDKWrapper;
