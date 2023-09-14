import React from "react";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const DisplayBalance = () => {
  
  const { account } = useSelector ((state: RootState) => ({
    account: state.account
  }))

  return (
    <div>
      <h1>Your Account Balance Is: {account.balance}</h1>
    </div>
  )
}

export default DisplayBalance;