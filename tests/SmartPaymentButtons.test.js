// @flow
import React from 'react';
import { render } from 'react-testing-library';
import SmartPaymentButtons from '../src';

const buttonsRenderSpy = jest.fn();

global.window.paypal = {
  Buttons: jest.fn(() => ({
    render: buttonsRenderSpy,
  })),
};

describe('<SmartPaymentButtons />', () => {
  beforeEach(() => {
    render((
      <SmartPaymentButtons
        createOrder={() => {}}
        onApprove={() => {}}
      />
    ));
  });

  it('calls the Buttons method with all config parameters and nothing else', () => {
    expect(window.paypal.Buttons).toHaveBeenCalledWith({
      createOrder: expect.any(Function),
      onApprove: expect.any(Function),
      onCancel: expect.any(Function),
      onError: expect.any(Function),
      style: expect.any(Object),
    });
  });

  it('renders the buttons into #SmartPaymentButtons', () => {
    expect(buttonsRenderSpy).toHaveBeenCalledWith('#SmartPaymentButtons');
  });

  it('render the buttons only once', () => {
    expect(buttonsRenderSpy).toHaveBeenCalledTimes(1);
  });
});
