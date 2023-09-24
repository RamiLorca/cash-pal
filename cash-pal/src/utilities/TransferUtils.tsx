import axios from "axios";
import { setToken } from "../features/account";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import type { RootState } from "../store";
import store from "../store";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useToken = () => {
    return useSelector((state: RootState) => state.account.token);
};
// export const fetchAccountBalance = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/accounts/2001`);
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch account balance.");
//   }
// };

export const transactionRequest = async (senderId: number, receiverId: number, amount: number) => {
    try {
        const response = await axios.post(`http://localhost:8080/transfer`, {
            headers: {
                Authorization: `Bearer ${useToken}`,
            },
            senderId: senderId,
            receiverId: receiverId,
            amount: amount
        });

        // if (response status === 200 || response status === 201)
        //      trigger function(s) to create transaction object and save it to the store
        // return response.data
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to initiate transaction.");
    }
};
