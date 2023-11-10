import React, { useState } from "react";
import { transactionRequest, fetchTransfers } from "../../utilities/TransferUtils";
import { RootState } from "../../store";
import { fetchOtherUserId } from "../../utilities/UserUtils";
import { useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { createSelector } from 'reselect';

const selectAccountId = (state: RootState) => state.account.account_id;
const selectAccountUsername = (state: RootState) => state.account.username;

const accountSelector = createSelector(
  selectAccountId,
  selectAccountUsername,
  (account_id, account_username) => ({
    account_id,
    account_username,
  })
);

const TransactionForm = () => {

  const { account_id, account_username } = useSelector(accountSelector);

  // const { account_id, account_username } = useSelector((state: RootState) => ({
  //   account_id: state.account.account_id,
  //   account_username: state.account.username,
  // }));

  // const { account_id } = useSelector((state: RootState) => ({
  //   account_id: state.account.account_id,
  // }));

  // const { account_username } = useSelector((state: RootState) => ({
  //   account_username: state.account.username,
  // }));

  const [activeButton, setActiveButton] = useState("Send Money");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [otherUsername, setOtherUsername] = useState("");
  const [amountInputValue, setAmountInputValue] = useState("");

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const resetForm = () => {
    setOtherUsername("");
    setCurrentAmount(0);
    setAmountInputValue("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const otherUserId = await fetchOtherUserId(otherUsername);

    if (activeButton === "Send Money") {
      try {
        const response = await transactionRequest(
          account_username,
          account_id,
          account_username, 
          otherUserId,
          otherUsername,
          currentAmount
        );
        console.log(response);

        console.log("Sending money...");

        fetchTransfers(account_id);
        resetForm();
      } catch (error) {
        console.error(error);
      }
    } else if (activeButton === "Request Money") {
      try {
        const response = await transactionRequest(
          account_username,
          otherUserId, 
          otherUsername,
          account_id,
          account_username,
          currentAmount
        );
        console.log(response);

        console.log("Requesting money...");

        fetchTransfers(account_id);
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

      <form id="transfer-form" onSubmit={handleSubmit}>

        <input 
          id="username-input"
          type="text" 
          placeholder="Enter username"
          value={otherUsername}
          onChange={(event) => {
            setOtherUsername(event.target.value);
          }} 
        />

        <br />

        <CurrencyInput
          id="amount-input"
          name="amount"
          placeholder="$0.00"
          decimalsLimit={2}
          prefix="$"
          value={amountInputValue}
          onValueChange={(value) => {
            const formattedValue = parseFloat(value || "0").toFixed(2);
            setCurrentAmount(parseFloat(formattedValue));
            setAmountInputValue(value || "");
          }}
        />
        
        <br />

        <input type="submit" value={activeButton} />
      </form>
    </div>
  )
}

export default TransactionForm;
