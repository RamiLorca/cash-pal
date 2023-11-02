import type { RootState, AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { listenForAccountUpdates } from "../../utilities/AccountActions";

const DisplayBalance = () => {
  
  const { account } = useSelector ((state: RootState) => ({
    account: state.account
  }))

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listenForAccountUpdates());
  }, [dispatch]);

  return (
    <div>
      <h1>Your Account Balance Is: {account.balance}</h1>
    </div>
  )
}

export default DisplayBalance;