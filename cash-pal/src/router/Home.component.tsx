import { Outlet } from "react-router-dom";
import DisplayBalance from "../components/home components/DisplayBalance.component";
import TransactionForm from "../components/home components/TransactionForm.component";

const Home = () => {
  return (
    <>
      <Outlet />
      <div>Home</div>
      <DisplayBalance />
      <TransactionForm />
    </>
  )
}

export default Home;