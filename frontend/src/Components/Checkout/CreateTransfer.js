import React, { useState } from 'react';
import Script from 'react-load-script';
let OmiseCard;
function createTransfer(props) {
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

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className='own-form'>
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleScriptLoad} />

      <form>
        <button className='btn' type='button' onClick={handleClick}>
          Transfer
        </button>
      </form>
    </div>
  );
}
export default createTransfer;
