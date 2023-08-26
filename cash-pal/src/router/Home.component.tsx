import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Outlet />
      <div>Home</div>
    </>
  )
}

export default Home;