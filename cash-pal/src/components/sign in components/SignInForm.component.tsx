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
import "./SignInForm.styles.scss";

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
    <form onSubmit={handleSignIn} className='sign-in-form'>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-stone-950 leading-tight focus:outline-none focus:bg-white focus:border-green-800'
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-stone-950 leading-tight focus:outline-none focus:bg-white focus:border-green-800'
      />

      <button 
        type="submit"
        className='shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none rounded-xl text-white font-bold py-2 px-4'
      >
        Login
      </button>

    </form>
  )
}

export default SignInForm;