import axios from "axios";
import store from "../store";

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
      //clear input fields and display success message
      // trigger function(s) to create transaction object and save it to the store
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to initiate transaction.");
  }
};
