import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';
import account from "../../features/account";

const selectAccount = (state: RootState) => state.account;
const accountSelector = createSelector(
  selectAccount,
  (account) => ({
    account,
  })
);

const DisplayBalance = () => {

  const { account } = useSelector(accountSelector);
  
  // const { account } = useSelector ((state: RootState) => ({
  //   account: state.account
  // }))

  return (
    <div>
      <h1>Your Account Balance Is: {account.balance}</h1>
    </div>
  )
}

export default DisplayBalance;