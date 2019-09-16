// @flow
import React from 'react';
import { render } from 'react-testing-library';
import { SmartSubscriptionButtons } from '../src';

const buttonsRenderSpy = jest.fn();

global.window.paypal = {
  Buttons: jest.fn(() => ({
    render: buttonsRenderSpy,
  })),
};

describe('<SmartSubscriptionButtons />', () => {
  let rerender;
  let container;

  beforeEach(() => {
    ({ rerender, container } = render((
      <SmartSubscriptionButtons
        createSubscription={() => {}}
        onApprove={() => {}}
        refresh={false}
      />
    )));
  });

  it('calls the Buttons method with all config parameters and nothing else', () => {
    expect(window.paypal.Buttons).toHaveBeenCalledWith({
      createSubscription: expect.any(Function),
      onApprove: expect.any(Function),
      onCancel: expect.any(Function),
      onError: expect.any(Function),
      style: expect.any(Object),
    });
  });

  it('renders the buttons into #SmartSubscriptionButtons', () => {
    expect(buttonsRenderSpy).toHaveBeenCalledWith('#SmartSubscriptionButtons');
  });

  it('render the buttons only once', () => {
    expect(buttonsRenderSpy).toHaveBeenCalledTimes(1);
  });

  it('handles undefined refresh values', () => {
    rerender((
      <SmartSubscriptionButtons
        createSubscription={() => {}}
        onApprove={() => {}}
        refresh={undefined}
      />
    ));

    expect(container).toBeTruthy();
  });

  describe('on refresh', () => {
    beforeEach(() => {
      rerender((
        <SmartSubscriptionButtons
          createSubscription={() => {}}
          onApprove={() => {}}
          refresh
        />
      ));
    });

    it('rerenders the button', () => {
      expect(buttonsRenderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
