import { processPendingTransfer, fetchTransfers } from "../../utilities/TransferUtils";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store";

type TransferProps = {
  transfer_id: number;
  transfer_status: string;
  sender_username: string;
  receiver_username: string;
  amount: string;
};

const Transfer = ({transfer_id, transfer_status, sender_username, receiver_username, amount}: TransferProps) => {

const { account_id, account_username } = useSelector((state: RootState) => ({
  account_id: state.account.account_id,
  account_username: state.account.username
}), shallowEqual);

  const other_username = account_username === sender_username ? receiver_username : sender_username;

  const transfer_type = account_username === sender_username ? '-    ' : '+    ';

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
    <div className='text-gray-300 flex flex-col justify-center items-start gap-6 py-6 mx-12 my-auto'>

      <p className='font-medium'>
        Id: {transfer_id}
      </p>

      <div className='flex flex-row justify-between items-center w-full'>

        <div className='flex flex-row justify-start items-start text-left w-1/3 mx-0'>
          <div className='flex flex-row justify-start items-center gap-4'>
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-gray-200 bg-gray-100"
              src="default-avatar.svg"
              alt=""
            />
            <p>{other_username}</p>
          </div>
        </div>

        <div className='flex flex-row justify-start items-start text-left w-1/6 mx-0'>
          <p className={`font-normal ${sender_username === account_username ? 'text-rose-400' : 'text-green-400'}`}>
              {transfer_type}{amount}
          </p>
        </div>

        <div className='flex flex-row justify-start items-start text-left w-1/6 mx-0'>
          <p className='italic font-normal'>{transfer_status}</p>
        </div>

        <div className='flex flex-row justify-center items-center gap-x-3'>
          <button
            className={`shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none rounded-2xl text-white font-semibold w-1/2 py-2 px-4 ${transfer_status === 'Complete' || transfer_status === 'Completed' || (transfer_status === 'Pending' && receiver_username === account_username) ? 'opacity-30 pointer-events-none bg-gray-500 hover:bg-gray-500' : ''}`}  
            onClick={() => handleClick(true)}
            disabled={transfer_status === 'Complete' || transfer_status === 'Completed' || (transfer_status === 'Pending' && receiver_username === account_username)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" data-slot="icon" className="w-5 h-5 stroke-gray-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </button>

          <button
            className={`shadow bg-rose-700 hover:bg-rose-500 focus:shadow-outline focus:outline-none rounded-2xl text-white font-semibold w-1/2 py-2 px-4 ${transfer_status === 'Complete' || transfer_status === 'Completed' ? 'opacity-30 pointer-events-none bg-gray-500 hover:bg-gray-500' : ''}`}  
            onClick={() => handleClick(false)}
            disabled={transfer_status === 'Complete' || transfer_status === 'Completed'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" data-slot="icon" className="w-5 h-5 stroke-gray-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

        </div>

      </div>

    </div>
  )
};
  
export default Transfer;