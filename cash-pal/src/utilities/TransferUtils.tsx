import axios from "axios";
import store from "../store";
import { updateTransfers } from "../features/transfer";

export const transactionRequest = async (
  senderId: number,
  receiverId: number,
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
        sender_id: senderId,
        receiver_id: receiverId,
        amount: amount,
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
      `http://localhost:8080/transfer/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const transfers = response.data;
    
    store.dispatch(updateTransfers(transfers));

    return transfers;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transfers");
  }
};
