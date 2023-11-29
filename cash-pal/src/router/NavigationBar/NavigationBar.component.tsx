import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import DisplayUsername from "../../components/home components/DisplayUsername.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../features/account";
import { clearTransferHistory } from "../../features/transfer";
import { useIdleTimer, PresenceType } from "react-idle-timer";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import './NavigationBar.styles.scss';

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
    <div className="main-navigation-bar-container">
      {/* block below allows view of idle timer */}
      {/* <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p> */}

      {!hideNavigation && (
        <div className="navigation-container">
          <div className="nav-link-container">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/settings">
                Settings
              </Link>

              {isLoggedIn ? (
                <Link className="nav-link" to="/signin" onClick={handleSignOut}>
                  Sign Out
                </Link>
              ) : (
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              )}
          </div>

          <DisplayUsername />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default NavigationBar;
