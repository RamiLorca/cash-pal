import axios from "axios";
import store from "../store";
import { setToken } from "../features/account";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

export const fetchSignInDetails = async (username: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:8080/login`, {
      username,
      password,
    });
    if (response.status === 200) {
      const { token } = response.data;
      store.dispatch(setToken(token));
    } else {
      throw new Error("Failed to log in");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to log in");
  }
};