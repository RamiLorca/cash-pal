import { Outlet } from "react-router-dom";
import DisplayBalance from "../components/home components/DisplayBalance.component";

const Home = () => {
  return (
    <>
      <Outlet />
      <div>Home</div>
      <DisplayBalance />
    </>
  )
}

export default Home;