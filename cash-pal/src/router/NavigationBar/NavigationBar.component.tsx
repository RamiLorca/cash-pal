import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import DisplayUsername from "../../components/home components/display username components/DisplayUsername.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../features/account";
import { clearTransferHistory } from "../../features/transfer";
import { useIdleTimer, PresenceType } from "react-idle-timer";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import "./NavigationBar.styles.scss";
import DisplayBalance from "../../components/home components/DisplayBalance.component";

const selectIsLoggedIn = (state: RootState) => state.account.activated;
const isLoggedInSelector = createSelector(selectIsLoggedIn, (isLoggedIn) => ({
  isLoggedIn,
}));

const NavigationBar = () => {
  const [count, setCount] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [remaining, setRemaining] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState<string>("Active");

  const onPresenceChange = (presence: PresenceType) => {
    const isIdle = presence.type === "idle";
    const isPrompted = presence.type === "active" && presence.prompted;
    const isActive = presence.type === "active" && !presence.prompted;

    if (isIdle) {
      setState("Idle");
      handleSignOut();
      //routing to sign in screen
    } else if (isPrompted) {
      setState("Prompted");
    } else if (isActive) {
      setState("Active");
    }
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onPresenceChange,
    onAction,
    timeout: 10_000 * 10 * 6,
    promptBeforeIdle: 3000,
    throttle: 200,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoggedIn } = useSelector(isLoggedInSelector);

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(clearTransferHistory());
    navigate(signInScreenPath);
  };

  const atSignInScreen = location.pathname === "/signin";
  const hideNavigation = !isLoggedIn && atSignInScreen;
  const signInScreenPath = "/signin";
  const navigate = useNavigate();

  return (
    <div 
      className='w-full min-h-screen flex flex-row my-0 py-0'
    >

      {/* block below allows view of idle timer */}
      {/* <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p> */}

      {!hideNavigation && (
        <div className='bg-gradient-to-l from-green-600 from-5% via-green-700 via-40% to-green-900 to-100% flex flex-col justify-center mih-h-fit w-3/12 mr-10'>

          <img className="logo-nav-bar" src="cash-pal-logo-white.svg" alt="cash pal logo white" />

          <DisplayUsername />

          <div className="nav-link-container">

            <Link className="nav-link" to="/">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              data-slot="icon" 
              className="w-6 h-6"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" 
              />
            </svg>
              Transfer
            </Link>

            <Link className="nav-link" to="/funds">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                data-slot="icon" 
                className="w-6 h-6"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                />
              </svg>
              <DisplayBalance />
            </Link>

            <Link className="nav-link" to="/settings">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" 
                />
              </svg>
              Settings
            </Link>

            {isLoggedIn ? (
              <Link className="nav-link" to="/signin" onClick={handleSignOut}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Sign Out
              </Link>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default NavigationBar;
