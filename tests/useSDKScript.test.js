// @flow
import React from 'react';
import { render } from 'react-testing-library';
import useSDKScript from '../src/hooks/useSDKScript';

const TestComponent = ({ sdkScriptId }: any) => {
  const { isSDKLoaded } = useSDKScript(sdkScriptId);

  if (!isSDKLoaded) {
    return <span>Loading</span>;
  }

  return <span>Done</span>;
};

describe('useSDKScript hook', () => {
  afterEach(() => {
    window.paypal = undefined;
  });

  it('returns loading completed when setting no sdk id', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Done')).toBeTruthy();
  });

  it('returns loading completed when paypal is already loaded', () => {
    window.paypal = true;
    const { getByText } = render((
      <TestComponent sdkScriptId="paypal-sdk" />
    ));
    expect(getByText('Done')).toBeTruthy();
  });

  it('returns loading while waiting for script to load', () => {
    const { getByText } = render((
      <TestComponent sdkScriptId="paypal-sdk" />
    ));
    expect(getByText('Loading')).toBeTruthy();
  });

  describe('with script', () => {
    let getByText;
    let unmount;
    let script;

    beforeEach(() => {
      script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = 'somefile.js';
      script.async = true;

      if (document.body) document.body.appendChild(script);

      ({ getByText, unmount } = render((
        <TestComponent sdkScriptId="paypal-sdk" />
      )));
    });

    it('returns loaded when script was successfully loaded', () => {
      expect(getByText('Done')).toBeTruthy();
    });

    it('removes the event listener on unmount', () => {
      unmount();
    });
  });
});
