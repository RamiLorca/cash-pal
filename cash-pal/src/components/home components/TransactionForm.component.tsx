import React, { useState } from 'react';
import { transactionRequest } from '../../utilities/TransferUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const { account_id } = useSelector((state: RootState) => ({
  account_id: state.account.account_id,
}));

const TransactionForm = () => {

    const [activeButton, setActiveButton] = useState('Send Money');

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activeButton === 'Send Money') {
          try {
            // Logic for sending money
          const response = await transactionRequest(account_id, receiverId, amount);
          console.log(response);
          // Add setter functions to clear input fields.

          /*
           * Send request to the backend
           * If (success status returned)
           *   Send POST to the back end to store data in the database
           *  
          */
          console.log('Sending money...');
          }
          catch (error) {
            console.error(error);
          };
        } else if (activeButton === 'Request Money') {
          try {
            // Logic for sending money
          const response = await transactionRequest(senderId, account_id, amount);
          console.log(response);
          // Add setter functions to clear input fields.

          /*
           * Send request to the backend
           * If (success status returned)
           *   Send POST to the back end to store data in the database
           *  
          */
          console.log('Requesting money...');
          }
          catch (error) {
            console.error(error);
          };
        }
      };

    return (
      <div>
        <h1>Transaction Form</h1>

        <button onClick={() => handleButtonClick('Send Money')}>Send Money</button>
        <button onClick={() => handleButtonClick('Request Money')}>Request Money</button>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Enter username"></input>

            <br/>

            <input type="number" min="0.00" step="0.01" placeholder="Enter cash amount"></input>

            <br/>

            <input type="submit" value={activeButton} />
    
        </form>

      </div>
    )
  }
  
export default TransactionForm;