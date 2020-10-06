import React from 'react';
import Script from 'react-load-script';
import axios from 'axios';

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
    console.log(cart);
    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount: cart.total * 100,
      onCreateTokenSuccess: (token) => {
        createInternetBankingCharge(
          cart.email,
          cart.provider_name,
          cart.total,
          token,
          cart.billId
        );
      },
      onFormClosed: () => {},
    });
  };
  const Paymentsuccess = async () => {
    const { cart } = props;
    try {
      await axios.patch(`/tasks/customers/${cart.billId}`, {
        status: 'CONFIRM',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    internetBankingConfigure();
    omiseCardHandler();
    // Paymentsuccess();
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
          disabled={cart.total === 0}
          onClick={handleClick}
        >
          Pay with Internet Banking / Others
        </button>
      </form>
    </div>
  );
}

export default CheckoutInternetBanking;
