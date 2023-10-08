import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const DisplayUsername = () => {
  
  const { account } = useSelector ((state: RootState) => ({
    account: state.account
  }));

  return (
    <div>
      <h3>Logged in as: {account.username}</h3>
    </div>
  )
}

export default DisplayUsername;