import React, { useState } from 'react';
import { fetchSignInDetails } from '../../utilities/UserUtils';
import {
  setActivated,
  setAuthorities,
  setAccountId,
  setToken,
} from "../../features/account";
import { useDispatch } from "react-redux";
import { fetchTransfers } from '../../utilities/TransferUtils';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/");
    } catch (error) {
      console.error(error);
    }

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

    </form>
  )
}

export default SignInForm;