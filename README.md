# react-smart-payment-buttons

[![CircleCI](https://circleci.com/gh/erksch/react-smart-payment-buttons.svg?style=svg)](https://circleci.com/gh/erksch/react-smart-payment-buttons)
[![Coverage Status](https://coveralls.io/repos/github/erksch/react-smart-payment-buttons/badge.svg)](https://coveralls.io/github/erksch/react-smart-payment-buttons)
[![npm package](https://badge.fury.io/js/react-smart-payment-buttons.svg)](https://www.npmjs.com/package/react-smart-payment-buttons)
[![npm downloads](https://img.shields.io/npm/dm/react-smart-payment-buttons.svg)](https://www.npmjs.com/package/react-smart-payment-buttons)

A react integration for PayPal's Smart Payment Buttons.

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

Alternatively, you can also load the script **asynchronously**:

```html
<script id="paypal-sdk" src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID" async></script>
```

Now you can tell `SmartPaymentButtons` to wait until the SDK is loaded by providing the `sdkScriptId` you chose earlier:

```javascript
<SmartPaymentButtons
  sdkScriptId="paypal-sdk"
  loading={<Spinner />} // optional
  createOrder={...}
  onApprove={...}
/>
```

You can add an optional `loading` prop to display something until the buttons are displayed.

Making the `<script>` asynchronous is a highly recommend because it reduces the load time of your application.

### Alternative: Use the built in PayPalSDKWrapper component

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


This option also reduces the load time of your application like the async script. A second benefit is that the PayPal SDK is only loaded when it's needed: Users who are entering your website may not want to immediatly download a PayPal SDK. By using the wrapper you are able to defer loading the SDK for example to when the users enters the checkout page.

Instead of using the `clientId` prop you can also create an environment variable `REACT_APP_PAYPAL_CLIENT_ID` (for create-react-app usage) that contains the id. The `PayPalSDKWrapper` will pick it up automatically.

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
|containerStyle| React StyleSheet Object    | Style applied to the button's container |
|containerClassName| string | CSS class applied to the button's container |
|refresh      | mixed                   | If this value changes the buttons are rerendered |
|sdkScriptId  | string                   | ID of the script tag loading the PayPal SDK asynchronously |
|loading | React Node | Only works with sdkScriptId. Is displayed until the SDK is loaded. |

### PayPalSDKWrapper component

The component accepts all parameters the SDK accepts. See the [official Customize SDK documentation](https://developer.paypal.com/docs/checkout/reference/customize-sdk/)  for reference.

**Attention**

- The `PayPalSDKWrapper` expects the props to be in `camelCase` instead of `kebab-case` like the SDK parameters.

- The SDK parameters that take a comma separated list like `disable-funding=card,sepa` have to be assigned with an array in the props like `disableFunding={['card', 'sepa']}`.
