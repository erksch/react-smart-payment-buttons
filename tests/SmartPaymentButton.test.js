// @flow
import React from 'react'
import { render } from 'react-testing-library'
import SmartPaymentButtons from '../src';

const buttonsRenderSpy = jest.fn();

global.window.paypal = {
  Buttons: jest.fn(() => ({
    render: buttonsRenderSpy,
  })),
};

test('it renders the buttons into #SmartPaymentButtons', () => {
  const { container } = render(<SmartPaymentButtons />);
  expect(buttonsRenderSpy).toHaveBeenCalledWith('#SmartPaymentButtons');
});

test('it should only render the buttons once', () => {
  const { container } = render(<SmartPaymentButtons />);
  expect(buttonsRenderSpy).toHaveBeenCalledTimes(1);
});
