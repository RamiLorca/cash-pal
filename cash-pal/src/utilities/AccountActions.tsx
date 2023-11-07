// import { Dispatch } from 'redux';
// import { io } from 'socket.io-client';
// import { setAccountBalance } from '../features/account';

// export const UPDATE_ACCOUNT_BALANCE = 'UPDATE_ACCOUNT_BALANCE';

// export const updateAccountBalance = (balance: number) => ({
//     type: UPDATE_ACCOUNT_BALANCE,
//     payload: balance,
//   });

//   export const listenForAccountUpdates = () => (dispatch: Dispatch) => {
    
//     // Connect to the server
//     const socket = io('ws://localhost:8080/socket.io');

//     // Listen for updates from the server
//     socket.on('balance', (update: { payload: number }) => {
//       dispatch(setAccountBalance(update.payload));
//     });
//   };