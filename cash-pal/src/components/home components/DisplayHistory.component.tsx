import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store";
import Transfer from "./Transfer.component";
import { createSelector } from 'reselect';
import { useEffect } from "react";
import { fetchTransfers } from "../../utilities/TransferUtils";

const selectAccountId = (state: RootState) => state.account.account_id;
const accountIdSelector = createSelector(
  selectAccountId,
  (account_id) => ({
    account_id,
  })
);

const selectTransfers = (state: RootState) => state.transfer.transfers;
const memoizedSelectTransfers = createSelector(
  selectTransfers,
  (transfers) => transfers
);

const DisplayHistory = () => {

  const { account_id } = useSelector(accountIdSelector);

  useEffect(() => {
      fetchTransfers(account_id);
  }, [account_id]);

  const transfers = useSelector(memoizedSelectTransfers, shallowEqual);
  const sortedTransfers = [...transfers].sort((a, b) => b.transfer_id - a.transfer_id);

  const formatToCurrencyString = (number: number): string => {
    return "$" + (Math.round(number * 100) / 100).toFixed(2);
  };

  if (!transfers || transfers.length === 0) {
    return (
      <div>
        <h1>Transfer History</h1>
        <p>No transfer history available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-hidden mb-6 mr-10">
      <h1 className="text-xl font-semibold mb-3">
        Transfer History
      </h1>
      <div className="bg-zinc-800 shadow-md rounded-3xl pr-8 py-6">
        <div className='max-h-96 overflow-y-scroll flex flex-col divide-y divide-slate-400/25'>
            {sortedTransfers
              .filter((transfer) => transfer !== null)
              .map((transfer) => (
                <Transfer
                  key={transfer.transfer_id}
                  transfer_id={transfer.transfer_id}
                  transfer_status={transfer.transfer_status}
                  sender_username={transfer.sender_username}
                  receiver_username={transfer.receiver_username}
                  amount={formatToCurrencyString(transfer.amount)}
                />
              ))}

        </div>
      </div>
    </div>
  );
};
  
export default DisplayHistory;