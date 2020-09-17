import React from 'react';
import Script from 'react-load-script';

let OmiseCard;

function CheckoutInternetBanking(props) {
  const handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: 'pkey_test_5kztsilf5b2uzd7xr5m',
      frameLabel: 'Pet Shop',
      submitLabel: 'PAY NOW',
      currency: 'thb',
    });
  };

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'internet_banking',
      otherPaymentMethods: [
        'bill_payment_tesco_lotus',
        'alipay',
        'pay_easy',
        'net_banking',
        'convenience_store',
      ],
    });
    OmiseCard.configureButton('#internet-banking');
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    const { cart, createInternetBankingCharge } = props;
    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount: cart.amount,
      onCreateTokenSuccess: (token) => {
        createInternetBankingCharge(cart.email, cart.name, cart.amount, token);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    internetBankingConfigure();
    omiseCardHandler();
  };
  const { cart } = props;
  return (
    <div>
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleScriptLoad} />
      <form>
        <button
          id='internet-banking'
          className='btn internet-banking'
          type='button'
          disabled={cart.amount === 0}
          onClick={handleClick}
        >
          Pay with Internet Banking / Others
        </button>
      </form>
    </div>
  );
}

export default CheckoutInternetBanking;
