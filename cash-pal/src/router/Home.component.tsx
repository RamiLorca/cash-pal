import { Outlet } from "react-router-dom";
import DisplayBalance from "../components/home components/DisplayBalance.component";
import TransactionForm from "../components/home components/transaction form/TransactionForm.component";
import DisplayHistory from "../components/home components/DisplayHistory.component";

const Home = () => {
  return (
    <>
      <Outlet />
      <div>Home</div>
      <DisplayBalance />
      <TransactionForm />
      <br />
      <DisplayHistory />
    </>
  );
};

export default Home;
