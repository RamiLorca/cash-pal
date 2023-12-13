import type { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import "./DisplayUsername.styles.scss";

const selectAccount = (state: RootState) => state.account;
const accountSelector = createSelector(selectAccount, (account) => ({
  account,
}));

const DisplayUsername = () => {
  const { account } = useSelector(accountSelector);

  return (
    <div className="main-username-display-container">
      <img
          className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
          src="default-avatar.svg"
          alt=""
        />

      <h3 id="display-username">{account.username}</h3>
    </div>
  );
};

export default DisplayUsername;
