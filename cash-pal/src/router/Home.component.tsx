import { Outlet } from "react-router-dom";
import DisplayBalance from "../components/home components/DisplayBalance.component";
import TransactionForm from "../components/home components/transaction form/TransactionForm.component";
import DisplayHistory from "../components/home components/DisplayHistory.component";
import AddBalanceForm from "../components/home components/AddBalanceForm.component";

const Home = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <Outlet />
      <DisplayBalance />
      <AddBalanceForm />
      <br/>
      <TransactionForm />
      <br />
      <DisplayHistory />
    </div>
  );
};

export default Home;
