import axios from "axios";
import { store } from "../store";
import { 
      addTransfer, 
      setAmount, 
      setReceiverId, 
      setReceiverUsername, 
      setSenderId,  
      setSenderUsername,  
      setTimeSent, 
      setTransferId, 
      setTransferStatus,
      Transfer,
      updateTransfers 
} from "../features/transfer";

export const transactionRequest = async (
  initiatorUsername: string,
  senderId: number,
  senderUsername: string,
  receiverId: number,
  receiverUsername: string,
  amount: number
) => {

  try {
    const token = store.getState().account.token;

    if (receiverId === 0) {
      throw new Error("Invalid receiverId");
    }
    
    const response = await axios.post(
      `http://localhost:8080/transfer`,
      {
        initiator_username: initiatorUsername,
        sender_id: senderId,
        sender_username: senderUsername,
        receiver_id: receiverId,
        receiver_username: receiverUsername,
        amount: amount
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {

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
  
    transfers.forEach((transfer: Transfer) => {
      store.dispatch(setAmount(transfer.amount));
      store.dispatch(setTransferId(transfer.transfer_id));
      store.dispatch(setTransferStatus(transfer.transfer_status));
      store.dispatch(setSenderId(transfer.sender_id));
      store.dispatch(setReceiverId(transfer.receiver_id));
      store.dispatch(setTimeSent(transfer.time_sent));
      store.dispatch(setSenderUsername(transfer.sender_username));
      store.dispatch(setReceiverUsername(transfer.receiver_username));

      store.dispatch(addTransfer());
    });

    return transfers;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transfers");
  }

};

export const processPendingTransfer = async (transferId: number, isAccepted: boolean) => {

  try{
    const token = store.getState().account.token;
    const response = await axios.put(
      `http://localhost:8080/transfer`,
      {
        transferId: transferId,
        isAccepted: isAccepted
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to process transfer");
  }
};
