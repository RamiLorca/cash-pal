
import React, { useState } from 'react';

const TransactionForm = () => {

    const [activeButton, setActiveButton] = useState('Send Money');

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activeButton === 'Send Money') {
          // Logic for sending money
          console.log('Sending money...');
        } else if (activeButton === 'Request Money') {
          // Logic for requesting money
          console.log('Requesting money...');
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