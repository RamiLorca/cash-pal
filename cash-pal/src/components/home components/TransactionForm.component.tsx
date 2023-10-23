import React, { useState, useEffect } from "react";
import { transactionRequest, fetchTransfers } from "../../utilities/TransferUtils";
import { RootState } from "../../store";
import { fetchOtherUserId } from "../../utilities/UserUtils";
import { useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";

// import { 
//   addTransfer, 
//   setReceiverUsername, 
//   setSenderUsername, 
//   setAmount 
// } from "../../features/transfer";

const TransactionForm = () => {

  // const dispatch = useDispatch();

  const { transfer } = useSelector((state: RootState) => ({
    transfer: state.transfer,
  }));

  const { account_id } = useSelector((state: RootState) => ({
    account_id: state.account.account_id,
  }));

  const { account_username } = useSelector((state: RootState) => ({
    account_username: state.account.username,
  }));

  // const { account } = useSelector ((state: RootState) => ({
  //   account: state.account
  // }));

  const [activeButton, setActiveButton] = useState("Send Money");
  const [currentAmount, setCurrentAmount] = useState(0.00);
  const [otherUsername, setOtherUsername] = useState("");

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const resetForm = () => {
    const usernameInput = document.getElementById("username-input") as HTMLInputElement;
    // const amountInput = document.getElementById("amount-input") as HTMLInputElement;

    setOtherUsername("");
    setCurrentAmount(0.00);
    
    usernameInput.value = "";
    // amountInput.value = "";
  };

  // const createTransfer = (senderId: string, receiverId: string, amount: number) => {
    
  //   dispatch(setSenderUsername(senderId));
  //   dispatch(setReceiverUsername(receiverId));
  //   dispatch(setAmount(amount));
  //   dispatch(addTransfer());
  // };

  useEffect(() => {
    console.log("Current transfers in store: ", transfer.transfers);
  }, [transfer]);

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

        // createTransfer(account.username, otherUsername, currentAmount);
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

        <CurrencyInput
          id="amount-input"
          name="amount"
          placeholder="$0.00"
          decimalsLimit={2}
          prefix="$"
          onValueChange={(value) => {
            const formattedValue = parseFloat(value || "0").toFixed(2);
            setCurrentAmount(parseFloat(formattedValue));
          }}
        />
        
        <br />

        <input type="submit" value={activeButton} />
      </form>
    </div>
  );
};

export default TransactionForm;
