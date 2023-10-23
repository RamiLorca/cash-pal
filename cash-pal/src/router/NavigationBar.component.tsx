import { Outlet, Link } from "react-router-dom";
import DisplayUsername from "../components/home components/DisplayUsername.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../features/account";

const NavigationBar = () => {

const dispatch = useDispatch();

const { isLoggedIn } = useSelector((state: RootState) => ({
  isLoggedIn: state.account.activated,
}));

const handleSignOut = () => {
  dispatch(logout());
};

  return (
    <>
        <div className='navigation-container'>

            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/settings'>Settings</Link>
            {/* <Link className='nav-link' to='/signin'>Sign In</Link>
            <Link className="nav-link" to='/signout'>Sign Out</Link> */}

            {/* <Link className="nav-link" to={isLoggedIn ? 'signout' : '/signin'}>
              {isLoggedIn ? 'Sign Out' : 'Sign In'}
            </Link> */}

            {isLoggedIn ? (
              <Link className='nav-link' to='/signin' onClick={handleSignOut}>Sign Out</Link>
            ) : (
              <Link className='nav-link' to='/signin'>Sign In</Link>
            )}

            <DisplayUsername />

        </div>
        <Outlet />
    </>
  )
}

export default NavigationBar;