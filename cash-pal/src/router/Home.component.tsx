import { Outlet } from "react-router-dom";
import DisplayBalance from "../components/home components/DisplayBalance.component";
import TransactionForm from "../components/home components/transaction form/TransactionForm.component";
import DisplayHistory from "../components/home components/DisplayHistory.component";
import AddBalanceForm from "../components/home components/AddBalanceForm.component";

const Home = () => {
  return (
    <>
      <Outlet />
      <div>Home</div>
      <DisplayBalance />
      <AddBalanceForm />
      <br/>
      <TransactionForm />
      <br />
      <DisplayHistory />
    </>
  );
};

export default Home;
