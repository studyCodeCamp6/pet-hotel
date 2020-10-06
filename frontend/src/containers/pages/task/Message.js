import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import MessageDetails from '../../../Components/Checkout/modal/MessageDetails';
import Spinner from '../../../Components/Checkout/spinner/Spinner';

function Message(props) {
  const [message, setMessage] = useState({
    loading: false,
    openModal: false,
    charge: undefined,
  });
  //   const history = useHistory();
  useEffect(async () => {
    setMessage({ ...message, loading: true });

    const response = await axios.get('/bank-charge');

    if (response.data) {
      setMessage({ loading: false, openModal: true, charge: response.data });
    }
  }, []);

  const handleCloseModal = () => {
    setMessage({ ...message, openModal: false });
    // history.push('/checkout');
    window.location.href = '/customer/task';
  };
  const { loading, openModal, charge } = message;
  return (
    <React.Fragment>
      {loading && <Spinner />}
      {openModal && (
        <MessageDetails charge={charge} closeModal={handleCloseModal} />
      )}
    </React.Fragment>
  );
}

export default Message;
