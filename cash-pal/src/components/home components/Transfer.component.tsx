
type TransferProps = {
  key: number,
  sender: string;
  receiver: string;
  amount: number;
};

const Transfer = ({key, sender, receiver, amount}: TransferProps) => {

    return (
      <div>
        <h2>Transfer Details</h2>
        <p>Id: {key}</p>
        <p>Sender: {sender}</p>
        <p>Receiver: {receiver}</p>
        <p>Amount: {amount}</p>
      </div>
    )
};
  
export default Transfer;