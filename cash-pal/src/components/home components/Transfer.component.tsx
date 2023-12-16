import { processPendingTransfer, fetchTransfers } from "../../utilities/TransferUtils";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store";
import { createSelector } from 'reselect';

type TransferProps = {
  transfer_id: number;
  transfer_status: string;
  sender_username: string;
  receiver_username: string;
  amount: string;
};

const selectAccountId = (state: RootState) => state.account.account_id;

const accountSelector = createSelector(
  selectAccountId,
  (account_id) => ({
    account_id,
  })
);

const Transfer = ({transfer_id, transfer_status, sender_username, receiver_username, amount}: TransferProps) => {

  const { account_id } = useSelector(accountSelector, shallowEqual);

  const handleClick = async (isAccepted: boolean) => {
    try {
      const response = await processPendingTransfer(transfer_id, isAccepted);
      console.log(response);
      fetchTransfers(account_id);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-zinc-800 shadow-md rounded-2xl px-8 pt-6 pb-8 ml-0 mr-0 my-auto w-11/12 ">
      <p>Id: {transfer_id}</p>
      <p>Status: {transfer_status}</p>
      <p>Sender: {sender_username}</p>
      <p>Receiver: {receiver_username}</p>
      <p>Amount: {amount}</p>

      <button onClick={() => handleClick(true)}>Accept</button>
      <button onClick={() => handleClick(false)}>Reject</button>
    </div>
  )
};
  
export default Transfer;