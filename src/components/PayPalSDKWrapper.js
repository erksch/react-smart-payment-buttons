// @flow
import React, { Component, Fragment } from 'react';
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
  children: React$Element<any>,
};

type State = {
  isScriptLoaded: boolean,
};
class PayPalSDKWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isScriptLoaded: false,
    };
  }

  getSDKParams() {
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

    return params;
  }

  handleScriptLoaded = () => {
    this.setState({ isScriptLoaded: true });
  };

  handleScriptError = () => {
    console.error('Error loading PayPal SDK script.');
  };

  loadScript() {
    const params = this.getSDKParams();
    const src = `https://www.paypal.com/sdk/js?${params}`;

    const scriptElement = document.createElement('script');
    scriptElement.src = src;

    scriptElement.addEventListener('load', () => this.handleScriptLoaded());
    scriptElement.addEventListener('error', () => this.handleScriptError());
    document.body.appendChild(scriptElement);

    return scriptElement;
  }

  componentDidMount () {
    this.loadScript();
  }

  render() {
    if (!this.state.isScriptLoaded) {
      return this.props.loading || null;
    }

    return this.props.children;
  }
}

export default PayPalSDKWrapper;
