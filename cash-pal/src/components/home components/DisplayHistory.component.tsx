import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Transfer from "./Transfer.component";

const DisplayHistory = () => {

  const transfers = useSelector((state: RootState) => state.transfer.transfers);

  const formatToCurrencyString = (number: number): string => {
    return "$" + (Math.round(number * 100) / 100).toFixed(2);
  };

  if (!transfers || transfers.length === 0) {
    return (
      <div>
        <h1>Transfer History :</h1>
        <p>No transfer history available.</p>
      </div>
    );
  }

  return (
    <div>
    <h1>Transfer History :</h1>
    {transfers
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
  );
};
  
export default DisplayHistory;