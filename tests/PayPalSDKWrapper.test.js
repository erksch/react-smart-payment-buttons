import React from 'react';
import queryString from 'query-string';
import {
  render,
  fireEvent,
  cleanup,
} from 'react-testing-library';
import PayPalSDKWrapper from '../src';

const sdkUrl = 'https://www.paypal.com/sdk/js';

describe('<PayPalSDKWrapper />', () => {
  let scriptElement;

  afterEach(cleanup);

  beforeEach(() => {
    render((
      <PayPalSDKWrapper
        clientId="CLIENT_ID"
        disableFunding={['card', 'sepa']}
        disableCard={['visa', 'mastercard']}
        loading="Loading..."
      >
        <span data-testid="child">Some Child</span>
      </PayPalSDKWrapper>
    ));

    scriptElement = document.querySelector(
      `script[src^='${sdkUrl}']`,
    );

    fireEvent.load(scriptElement);
  });

  it('loads the paypal javascript sdk script', () => {
    expect(scriptElement).toBeTruthy();
  });

  it('loads the paypal javascript sdk script with the correct parameters', () => {
    const query = scriptElement.src.split('?')[1];
    const usedParams = queryString.parse(query);

    expect(usedParams).toEqual({
      'client-id': 'CLIENT_ID',
      'disable-funding': 'card,sepa',
      'disable-card': 'visa,mastercard',
      vault: 'true',
    });
  });
});
