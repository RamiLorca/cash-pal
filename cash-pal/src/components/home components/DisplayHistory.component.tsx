import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Transfer from "./Transfer.component";

const DisplayHistory = () => {

  const transfers = useSelector((state: RootState) => state.transfer.transfers);

    return (
      <div>
        <h1>Transfer History :</h1>
        {transfers.map((transfer) => (
          <Transfer
            key={transfer.transfer_id}
            sender={transfer.sender_username}
            receiver={transfer.receiver_username}
            amount={transfer.amount}
          />
        ))}
      </div>
    );
};
  
export default DisplayHistory;