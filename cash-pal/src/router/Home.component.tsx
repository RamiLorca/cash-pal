import TransactionForm from "../components/home components/transaction form/TransactionForm.component";
import DisplayHistory from "../components/home components/DisplayHistory.component";

const Home = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <TransactionForm />
      <DisplayHistory />
    </div>
  );
};

export default Home;
