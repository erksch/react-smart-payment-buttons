import React from 'react';
import { render } from 'react-testing-library';
import { StateMock } from '@react-mock/state';
import { PayPalSDKWrapper } from '../src';

const sdkUrl = 'https://www.paypal.com/sdk/js';

describe('<PayPalSDKWrapper />', () => {
  it('loads the paypal javascript sdk script', () => {
    render((
      <PayPalSDKWrapper clientId="CLIENT_ID">
        <span>Some Child</span>
      </PayPalSDKWrapper>
    ));

    const tag = document.querySelector(
      `script[src='${sdkUrl}?client-id=CLIENT_ID']`,
    );
    expect(tag).toBeTruthy();
  });

  it('renders children when script load was successful', () => {
    const { container } = render((
      <StateMock state={{ isScriptLoaded: true }}>
        <PayPalSDKWrapper clientId="CLIENT_ID">
          <span id="child">Some Child</span>
        </PayPalSDKWrapper>
      </StateMock>
    ));

    expect(container.firstChild.id).toEqual('child');
  });
});
