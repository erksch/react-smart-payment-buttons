// @flow
/* eslint-disable react/require-default-props */
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import humps from 'humps';

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
  children: React$Element<any>,
};

function PayPalSDKWrapper(props: Props) {
  const {
    loading,
    children,
    ...config
  } = props;

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  function handleScriptLoaded() {
    setIsScriptLoaded(true);
  }

  function handleScriptError() {
    // Error loading PayPal SDK script.
  }

  function getSDKParams(): Object {
    const {
      clientId,
      disableFunding,
      disableCard,
      ...rest
    } = config;

    const params = {
      vault: true,
      clientId: clientId || process.env.REACT_APP_PAYPAL_CLIENT_ID,
      disableFunding: disableFunding && disableFunding.join(','),
      disableCard: disableCard && disableCard.join(','),
      ...rest,
    };

    return humps.decamelizeKeys(params, { separator: '-' });
  }

  useEffect(() => {
    const params = getSDKParams();
    const src = `https://www.paypal.com/sdk/js?${queryString.stringify(params)}`;

    const scriptElement = document.createElement('script');
    scriptElement.src = src;

    scriptElement.addEventListener('load', handleScriptLoaded);
    scriptElement.addEventListener('error', handleScriptError);

    if (document.body) {
      document.body.appendChild(scriptElement);
    }

    return () => {
      scriptElement.removeEventListener('load', handleScriptLoaded);
      scriptElement.removeEventListener('error', handleScriptError);
    };
  }, []);

  if (!isScriptLoaded) {
    return loading || null;
  }

  return children;
}

export default PayPalSDKWrapper;
