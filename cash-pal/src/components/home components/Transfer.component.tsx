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
    <div className="bg-zinc-800 shadow-md rounded-3xl flex flex-col justify-center items-start gap-y-2 px-8 pt-6 pb-8 ml-0 mr-6 my-auto">

      <p className='font-medium'>
        Id: {transfer_id}
      </p>

      <div className='flex flex-row justify-between items-center w-full'>
        
        <p>{sender_username}</p>
        <p>{receiver_username}</p>
        <p className='font-normal'>{amount}</p>
        <p className='italic font-normal'>{transfer_status}</p>

        <div className='flex flex-row justify-center items-center gap-x-3'>
          <button
            className='shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none rounded-2xl text-white font-semibold w-1/2 py-2 px-4'  
            onClick={() => handleClick(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-slot="icon" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </button>

          <button
            className='shadow bg-rose-500 hover:bg-rose-600 focus:shadow-outline focus:outline-none rounded-2xl text-white font-semibold w-1/2 py-2 px-4'  
            onClick={() => handleClick(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-slot="icon" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

        </div>

      </div>

    </div>
  )
};
  
export default Transfer;