import React from 'react';
import { render } from 'react-testing-library';
import { PayPalSDKWrapper } from '../src';

const sdkUrl = 'https://www.paypal.com/sdk/js';

describe('<PayPalSDKWrapper />', () => {
  beforeEach(() => {
    render((
      <PayPalSDKWrapper
        clientId="CLIENT_ID"
      />
    ));
  });

  it('loads the paypal javascript sdk script', () => {
    const tag = document.querySelector(
      `script[src='${sdkUrl}?client-id=CLIENT_ID']`,
    );
    expect(tag).toBeTruthy();
  });
});
