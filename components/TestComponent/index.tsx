import React from 'react';
import { useState } from 'react';
import {PayPalButtons} from "@paypal/react-paypal-js"
import styles from '../../styles/Main.module.scss';

const TestComponent = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState('');

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: 5.0,
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
		return actions.order.capture().then(function (details) {
			const {payer} = details;
			setBillingDetails(payer);
			setSucceeded(true);
		}).catch(err => setPaypalErrorMessage("something went wrong"));
  }
  return (
    <div className={styles.textContainer}>
      <p className={styles.paragraphText}>
      	pay with paypal
      </p>
      <div className={styles.spacer}>
      </div>
    	<PayPalButtons
    		style={{
					shape: "pill",
					tagline: false,
					layout: "horizontal",
    		}}
    		createOrder={createOrder}
    		onApprove={onApprove}
    	/>	
    </div>
  );
};

export default TestComponent;
