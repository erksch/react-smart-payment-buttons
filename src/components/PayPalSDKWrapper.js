// @flow
import React, { PureComponent, Fragment } from 'react';
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

class PayPalSDKWrapper extends PureComponent<Props> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      clientId, merchantId, intent, commit, vault,
      components, currency, disableFunding, disableCard,
      integrationDate, locale, buyerCountry, debug,
    } = this.props;

    const params = queryString.stringify(humps.decamelizeKeys({
      merchantId, intent, commit, vault, components,
      currency, integrationDate, locale, buyerCountry, debug,

      clientId: clientId || process.env.REACT_APP_PAYPAL_CLIENT_ID,
      disableFunding: disableFunding && disableFunding.join(','),
      disableCard: disableCard && disableCard.join(','),
    }, { separator: '-' }));

    const script = `https://www.paypal.com/sdk/js?${params}`;

    const Component = scriptLoader(script)(function (props) {
      if (this.props.loading && !props.isScriptLoaded) {
        return this.props.loading;
      }

      return this.props.children;
    });

    return <Component />;
  }
}

export default PayPalSDKWrapper;
