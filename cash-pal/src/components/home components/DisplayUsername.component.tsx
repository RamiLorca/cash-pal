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

const DisplayUsername = () => {

  const { account } = useSelector(accountSelector);
  
  // const { account } = useSelector ((state: RootState) => ({
  //   account: state.account
  // }));

  return (
    <div>
      <h3>Logged in as: {account.username}</h3>
    </div>
  )
}

export default DisplayUsername;