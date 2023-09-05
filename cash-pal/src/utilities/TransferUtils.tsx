import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchAccountBalance = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/2001`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch account balance.");
  }
};
