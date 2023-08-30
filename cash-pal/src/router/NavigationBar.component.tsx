import { Outlet, Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
        <div className='navigation-container'>

            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/settings'>Settings</Link>
            <Link className='nav-link' to='/signin'>Sign In</Link>
            <Link className="nav-link" to='/signout'>Sign Out</Link>

        </div>
        <Outlet />
    </>
  )
}

export default NavigationBar;