import React, { useState } from 'react';
import { fetchSignInDetails } from '../../utilities/UserUtils';
import {
  // setAccountBalance,
  setActivated,
  setAuthorities,
  setAccountId,
  setToken,
} from "../../features/account";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { fetchTransfers } from '../../utilities/TransferUtils';

const SignInForm = () => {

  const dispatch = useDispatch();

  const { account } = useSelector((state: RootState) => ({
    account: state.account,
  }));

  // const accountId = useSelector((state: RootState) => state.account.account_id);
  // const { token } = useSelector((state: RootState) => state.account);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchSignInDetails(username, password);

      dispatch(setAccountId(response.account.account_id));
      dispatch(setActivated(response.account.activated));
      dispatch(setAuthorities(response.account.authorities.name));
      dispatch(setToken(response.token));

      setUsername("");
      setPassword("");

      console.log("Logged in as: " + username);

      fetchTransfers(response.account.account_id);
    } catch (error) {
      console.error(error);
    }

  }

  const testStore = () => {
    console.log(account.balance);
  }

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      <button type='button' onClick={testStore}>Test</button>
    </form>
  )
}

export default SignInForm;