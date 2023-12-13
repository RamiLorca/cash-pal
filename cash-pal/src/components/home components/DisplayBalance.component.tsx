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
      <h2>Account Balance: ${account.balance}</h2>
    </div>
  )
}

export default DisplayBalance;