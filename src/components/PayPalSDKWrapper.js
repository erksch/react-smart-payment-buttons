// @flow
/* eslint-disable react/require-default-props */
import { Component } from 'react';
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

  componentDidMount() {
    this.loadScript();
  }

  getSDKParams(): Object {
    const {
      clientId, merchantId, intent, commit, vault,
      components, currency, disableFunding, disableCard,
      integrationDate, locale, buyerCountry, debug,
    } = this.props;

    const params = {
      clientId: clientId || process.env.REACT_APP_PAYPAL_CLIENT_ID,
      disableFunding: disableFunding && disableFunding.join(','),
      disableCard: disableCard && disableCard.join(','),
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
    };

    return humps.decamelizeKeys(params, { separator: '-' });
  }

  handleScriptLoaded = () => {
    this.setState({ isScriptLoaded: true });
  };

  handleScriptError = () => {
    // Error loading PayPal SDK script.
  };

  loadScript() {
    const params = this.getSDKParams();
    const src = `https://www.paypal.com/sdk/js?${queryString.stringify(params)}`;

    const scriptElement = document.createElement('script');
    scriptElement.src = src;

    scriptElement.addEventListener('load', () => this.handleScriptLoaded());
    scriptElement.addEventListener('error', () => this.handleScriptError());

    if (document.body) {
      document.body.appendChild(scriptElement);
    }

    return scriptElement;
  }

  render() {
    const { isScriptLoaded } = this.state;
    const { loading, children } = this.props;

    if (!isScriptLoaded) {
      return loading || null;
    }

    return children;
  }
}

export default PayPalSDKWrapper;
