import axios from "axios";
import { store } from "../store";
import { setToken, setAccountBalance, setUsername } from "../features/account";

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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to log in");
  }
};

export const fetchOtherUserId = async (otherUsername: string) => {
  try {
    const token = store.getState().account.token;
    const response = await axios.get(
      `http://localhost:8080/accounts/username/${otherUsername}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.account_id;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch other user's Id");
  }
};

export const addToBalance = async (accountId: number, amount: number) => {
  const token = store.getState().account.token;

  try {
    const response = await axios.put(`http://localhost:8080/accounts/addfunds`,
      {
        accountId: accountId,
        amount: amount
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw new Error("Failed to add funds to account");
  }
}
