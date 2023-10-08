import React, { useState } from "react";
import { transactionRequest } from "../../utilities/TransferUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchOtherUserId } from "../../utilities/UserUtils";

const TransactionForm = () => {
  const { account_id } = useSelector((state: RootState) => ({
    account_id: state.account.account_id,
  }));

  const [activeButton, setActiveButton] = useState("Send Money");
  const [amount, setAmount] = useState(0.0);
  const [otherUsername, setOtherUsername] = useState("");

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const resetForm = () => {
    const usernameInput = document.getElementById("username-input") as HTMLInputElement;
    const amountInput = document.getElementById("amount-input") as HTMLInputElement;

    setOtherUsername("");
    setAmount(0.0);
    
    usernameInput.value = "";
    amountInput.value = "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const otherUserId = await fetchOtherUserId(otherUsername);

    if (activeButton === "Send Money") {
      try {
        const response = await transactionRequest(
          account_id,
          otherUserId,
          amount
        );
        console.log(response);
        console.log("Sending money...");
        resetForm();
      } catch (error) {
        console.error(error);
      }
    } else if (activeButton === "Request Money") {
      try {
        const response = await transactionRequest(
          otherUserId, 
          account_id, 
          amount
        );
        console.log(response);
        console.log("Requesting money...");
        resetForm();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Transaction Form</h1>

      <button onClick={() => handleButtonClick("Send Money")}>
        Send Money
      </button>
      <button onClick={() => handleButtonClick("Request Money")}>
        Request Money
      </button>

      <form onSubmit={handleSubmit}>

        {/* for later: create alternating labels for other user's username: send to: & request from: */}

        <input 
          id="username-input"
          type="text" 
          placeholder="Enter username"
          onChange={(event) => {
            setOtherUsername(event.target.value);
          }} 
        />

        <br />

        <input
          id="amount-input"
          type="number"
          min="0.00"
          step="0.01"
          placeholder="Enter cash amount"
          onChange={(event) => {
            setAmount(event.target.valueAsNumber);
          }}
        />

        <br />

        <input type="submit" value={activeButton} />
      </form>
    </div>
  );
};

export default TransactionForm;
