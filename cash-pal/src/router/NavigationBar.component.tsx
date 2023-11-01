import { Outlet, Link, useLocation } from "react-router-dom";
import DisplayUsername from "../components/home components/DisplayUsername.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../features/account";
import { clearTransferHistory } from "../features/transfer";
import { useIdleTimer, PresenceType } from "react-idle-timer";
import { useEffect, useState } from "react";

const NavigationBar = () => {

  const [count, setCount] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [remaining, setRemaining] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState<string>('Active')

  const onPresenceChange = (presence: PresenceType) => {
    const isIdle = presence.type === 'idle'
    const isPrompted = presence.type === 'active' && presence.prompted
    const isActive = presence.type === 'active' && !presence.prompted

    if (isIdle) {
      setState('Idle');
      handleSignOut();
    } else if (isPrompted) {
      setState('Prompted')
    } else if (isActive) {
      setState('Active')
    }
  }

  const onAction = () => {
    setCount(count + 1)
  }

  const { getRemainingTime } = useIdleTimer({
    onPresenceChange,
    onAction,
    timeout: 10_000 * 10 * 6,
    promptBeforeIdle: 3000,
    throttle: 200
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state: RootState) => ({
    isLoggedIn: state.account.activated,
  }));

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(clearTransferHistory());
  };

  const atSignInScreen = location.pathname === '/signin';
  const hideNavigation = !isLoggedIn && atSignInScreen;

  return (
    <>

      {/* block below allows view of idle timer */}
      {/* <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p> */}

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