import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';

const selectAccount = (state: RootState) => state.account;
const accountSelector = createSelector(
  selectAccount,
  (account) => ({
    account,
  })
);

const DisplayBalance = () => {

  const { account } = useSelector(accountSelector);

  return (
    <div>
      <h1>Your Account Balance Is: {account.balance}</h1>
    </div>
  )
}

export default DisplayBalance;