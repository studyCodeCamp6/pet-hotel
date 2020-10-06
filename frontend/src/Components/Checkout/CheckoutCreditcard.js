import React, { useState } from 'react';
import Script from 'react-load-script';
let OmiseCard;
function Checkout(props) {
  const handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    // console.log(OmiseCard);
    OmiseCard.configure({
      publicKey: 'pkey_test_5kztsilf5b2uzd7xr5m',
      frameLabel: 'Pet Shop',
      submitLabel: 'PAY NOW',
      currency: 'thb',
      buttonLabel: 'Pay With Omise',
    });
    // console.log(OmiseCard);
  };
  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton('#credit-card', {});

    OmiseCard.attach();
  };
  // console.log(OmiseCard);

  const omiseCardHandler = () => {
    // console.log(props);
    const { cart, createCreditCardCharge } = props;
    console.log(cart.email);
    console.log(cart.provider_name);
    console.log(cart.total);

    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount: cart.total * 100,
      onCreateTokenSuccess: (token) => {
        console.log(token);
        createCreditCardCharge(
          cart.email,
          cart.provider_name,
          cart.total,
          token
        );
      },
      onFormClosed: () => {},
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
  };
  const { cart } = props;

  return (
    <div className='own-form'>
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleScriptLoad} />

      <form>
        <button
          id='credit-card'
          className='btn'
          type='button'
          disabled={cart.amount === 0}
          onClick={handleClick}
        >
          Pay with Credit Card
        </button>
      </form>
    </div>
  );
}

export default Checkout;
