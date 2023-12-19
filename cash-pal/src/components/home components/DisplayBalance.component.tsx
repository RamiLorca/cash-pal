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
    <div className="text-xl font-semibold my-auto mx-auto">
      <h3>{account.balance}</h3>
    </div>
  )
}

export default DisplayBalance;