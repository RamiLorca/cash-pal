import axios from "axios";
import store from "../store";
import { 
      addTransfer, 
      setAmount, 
      setReceiverId, 
      setSenderId,  
      setTimeSent, 
      setTransferId, 
      setTransferStatus,
      Transfer,
      updateTransfers 
} from "../features/transfer";

export const transactionRequest = async (
  senderId: number,
  receiverId: number,
  amount: number,
  accountUsername: string,
  otherUsername: string
) => {
  try {
    const token = store.getState().account.token;

    if (receiverId === 0) {
      throw new Error("Invalid receiverId");
    }

    const response = await axios.post(
      `http://localhost:8080/transfer`,
      {
        sender_id: senderId,
        receiver_id: receiverId,
        amount: amount,
        account_username: accountUsername,
        other_username: otherUsername
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      // trigger function(s) to create transaction object and save it to the store
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to initiate transaction");
  }
};

export const fetchTransfers = async (userId: number) => {

  try {
    const token = store.getState().account.token;

    const response = await axios.get(
      `http://localhost:8080/transfers/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      store.dispatch(updateTransfers([]));
    }

    const transfers = response.data;

    // need to add sender and receiver usernames, either to database or import it from other component
  
    transfers.forEach((transfer: Transfer) => {
      store.dispatch(setAmount(transfer.amount));
      store.dispatch(setTransferId(transfer.transfer_id));
      store.dispatch(setTransferStatus(transfer.transfer_status));
      store.dispatch(setSenderId(transfer.sender_id));
      store.dispatch(setReceiverId(transfer.receiver_id));
      store.dispatch(setTimeSent(transfer.time_sent));

      store.dispatch(addTransfer());
    });

    return transfers;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transfers");
  }
};
