import { Outlet, Link, useLocation } from "react-router-dom";
import DisplayUsername from "../components/home components/DisplayUsername.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../features/account";

const NavigationBar = () => {

const dispatch = useDispatch();
const location = useLocation();

  const { isLoggedIn } = useSelector((state: RootState) => ({
    isLoggedIn: state.account.activated,
  }));

  const handleSignOut = () => {
    dispatch(logout());
  };

  const atSignInScreen = location.pathname === '/signin';
  const hideNavigation = !isLoggedIn && atSignInScreen;

  return (
    <>
      {!hideNavigation && (
      
        <div className='navigation-container'>

            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/settings'>Settings</Link>
            
            {isLoggedIn ? (
              <Link className='nav-link' to='/signin' onClick={handleSignOut}>Sign Out</Link>
            ) : (
              <Link className='nav-link' to='/signin'>Sign In</Link>
            )}

            <DisplayUsername />

        </div>
        )}
        <Outlet />
    </>
  )
}

export default NavigationBar;