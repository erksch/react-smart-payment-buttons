# react-smart-payment-buttons

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

This package provides the `<SmartPaymentButtons />` component which renders the buttons with the given configuration. For the buttons to load, you PayPal JavaScript SDK needs to be globally available.

You can achieve this in two ways:

### Load the PayPal SDK with a script tag

```html
<script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID"></script>
```

Then you are able to use the `SmartPaymentButtons` component where ever you want:

```javascript
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

### Display loading indicator

It can take a second to load the script with the `PayPalSDKWrapper`. But you can attach some custom loading that you wan't to display while waiting for the script to load by using the `loading` property of the `PayPalSDKWrapper` component.

```javascript
<PayPalSDKWrapper
  clientId="CLIENT_ID"
  loading={<Spinner />}
>
  <SmartPaymentButtons
    createOrder={...}
    onApprove={...}
  />
</PayPalSDKWrapper>
```
