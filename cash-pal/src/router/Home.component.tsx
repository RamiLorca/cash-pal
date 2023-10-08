import { Outlet } from "react-router-dom";
import DisplayBalance from "../components/home components/DisplayBalance.component";
import TransactionForm from "../components/home components/TransactionForm.component";
import DisplayHistory from "../components/home components/DisplayHistory.component";
import DisplayPending from "../components/home components/DisplayPending.component";

const Home = () => {
  return (
    <>
      <Outlet />
      <div>Home</div>
      <DisplayBalance />
      <TransactionForm />
      <br />
      <DisplayHistory />
      <br />
      <DisplayPending />
    </>
  )
}

export default Home;