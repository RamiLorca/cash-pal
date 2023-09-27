import axios from "axios";
import store from "../store";
import { setToken, setAccountBalance, setUsername } from "../features/account";

// const useToken = () => {
//   return useSelector((state: RootState) => state.account.token);
// };

// `${API_BASE_URL}/register`

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:8080/register`, {
      username: username,
      password: password,
    });
    if (response.status === 201 || response.status === 200) {
      console.log("Successfully registered as " + username);
    } else {
      throw new Error("Failed to register");
    }
  } catch (error) {
    console.log("Testing");
    console.error(error);
    throw new Error("Failed to register");
  }
};

export const fetchSignInDetails = async (
  username: string,
  password: string
) => {
  try {
    const response = await axios.post(`http://localhost:8080/login`, {
      username,
      password,
    });
    if (response.status === 200) {
      const { token, account } = response.data;
      store.dispatch(setToken(token));
      store.dispatch(setAccountBalance(account.balance));
      store.dispatch(setUsername(account.username));
      console.log("fetchSignInDetails: account balance: " + account.balance);
    } else {
      throw new Error("Failed to log in");
    }
    return response.data;
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to log in");
  }
};

export const fetchOtherUserId = async (
  otherUsername: string
) => {
  try {
    const response = await axios.get(`http://localhost:8080/accounts/username/${otherUsername}`);
    return response.data.account_id;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch other user's Id");
  }
};
