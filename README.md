# react-smart-payment-buttons &middot; [![npm version](https://img.shields.io/npm/v/react-smart-payment-buttons.svg?style=flat)](https://www.npmjs.com/package/react-smart-payment-buttons) [![CircleCI](https://circleci.com/gh/erksch/react-smart-payment-buttons.svg?style=svg)](https://circleci.com/gh/erksch/react-smart-payment-buttons)

A react integration for the PayPal's Smart Payment Buttons.

**This package is work in progress.**

## Installation

Install with npm

```
npm install --save react-smart-payment-buttons
```

Install with yarn

```
yarn add react-smart-payment-buttons
```

## Usage

For the buttons to load, the PayPal JavaScript SDK needs to be globally available.

You can achieve this in two ways:

### Load the PayPal SDK with a script tag

```html
<script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID"></script>
```

Then you are able to use the `SmartPaymentButtons` component where ever you want:

```javascript
import SmartPaymentButtons from 'react-smart-payment-buttons';

function MyCheckout() {
  return (
    <div>
      <h1>Checkout</h1>
      <SmartPaymentButtons
        createOrder={...}
        onApprove={...}
      />
    </div>
  );
}
```

### OR use the built in PayPalSDKWrapper component

```javascript
import SmartPaymentButtons, { PayPalSDKWrapper } from 'react-smart-payment-buttons';

function MyCheckout() {
  return (
    <div>
      <h1>Checkout</h1>
      <PayPalSDKWrapper clientId="CLIENT_ID">
        <SmartPaymentButtons
          createOrder={...}
          onApprove={...}
        />
      </PayPalSDKWrapper>
    </div>
  );
}
```

As you can see, with this option you don't need to the import the script.


This option is faster because defers fetching the paypal script to a later time (when you actually need it).

### Display a loading indicator

It can take a second to load the script with the `PayPalSDKWrapper`. But you can attach some custom loading that you wan't to display while waiting for the script to load by using the `loading` property of the `PayPalSDKWrapper` component.

```javascript
return (
  <PayPalSDKWrapper
    clientId="CLIENT_ID"
    loading={<Spinner />}
  >
    <SmartPaymentButtons
      createOrder={...}
      onApprove={...}
    />
  </PayPalSDKWrapper>
);
```

## Props

### SmartPaymentButtons component

| Name        | Type                    | Description (PayPal Docs Link)   |
|-------------|-------------------------|----------------------------------|
|createOrder  | (data, actions) => any  | See [createOrder](https://developer.paypal.com/docs/checkout/integrate/#4-set-up-the-transaction) |
|onApprove    | (data, actions) => any  | See [onApprove](https://developer.paypal.com/docs/checkout/integrate/#5-capture-the-transaction) |
|onCancel     | (data) => any           | See [onCancel](https://developer.paypal.com/docs/checkout/integration-features/cancellation-page/) |
|onError      | (error) => any          | See [onError](https://developer.paypal.com/docs/checkout/integration-features/handle-errors/) |
|style        | Object                  | See [customization](https://developer.paypal.com/docs/checkout/integration-features/customize-button)  |
|containerStyle| React StyleSheet Object    | Style applied to the button's container. |
|containerClassName| string | CSS class applied to the button's container. |

### PayPalSDKWrapper component

The component accepts all parameters the SDK accepts. See the [official Customize SDK documentation](https://developer.paypal.com/docs/checkout/reference/customize-sdk/)  for reference.

**Attention**

- The `PayPalSDKWrapper` expects the props to be in `camelCase` instead of `kebab-case` like the SDK parameters.

- The SDK parameters that take a comma separated list like `disable-funding=card,sepa` have to be assigned with an array in the props like `disableFunding={['card', 'sepa']}`.
