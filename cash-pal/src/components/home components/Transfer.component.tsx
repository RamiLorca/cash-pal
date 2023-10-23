
type TransferProps = {
  transfer_id: number;
  transfer_status: string;
  sender_username: string;
  receiver_username: string;
  amount: string;
};

const Transfer = ({transfer_id, transfer_status, sender_username, receiver_username, amount}: TransferProps) => {

    return (
      <div>
        <h3>Transfer:</h3>
        <p>Id: {transfer_id}</p>
        <p>Status: {transfer_status}</p>
        <p>Sender: {sender_username}</p>
        <p>Receiver: {receiver_username}</p>
        <p>Amount: {amount}</p>
      </div>
    )
};
  
export default Transfer;