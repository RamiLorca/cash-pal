import { Client } from '@stomp/stompjs';
import { useEffect } from "react";
import { createSelector } from 'reselect';
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { store } from "../store";
import { setAccountBalance } from '../features/account';
import { fetchTransfers } from './TransferUtils';
import SockJS from 'sockjs-client';

const selectAccountId = (state: RootState) => state.account.account_id;
const accountIdSelector = createSelector(
  selectAccountId,
  (account_id) => ({
    account_id,
  })
);

// const client = new Client({
//     brokerURL: 'ws://localhost:8080/transfers-websocket',
//     reconnectDelay: 5000,
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
// });

const client = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/transfers-websocket'),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

// export const publishUsernameInput = (usernameInput: string) => {
//     const token = store.getState().account.token;
//     client.publish({
//         destination: '/app/accounts-autocomplete', 
//         body: JSON.stringify({ usernameInput }),
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     console.log(usernameInput);
// };

const TransferWebSocketConfig = () => {

    const { account_id } = useSelector(accountIdSelector);

    useEffect(() => {

        client.onConnect = () => {
            console.log('Connected to Transfer WebSocket');

            client.subscribe(`/topic/transfer-updates/${account_id}`, (message) => {
                if (message.body) {
                    try {
                        const jsonBody = JSON.parse(message.body);

                        if (jsonBody.message === "New Transfer") {
                            fetchTransfers(account_id);
                        } else {
                            const newBalance = parseFloat(jsonBody.message);
                            store.dispatch(setAccountBalance(newBalance));
                            fetchTransfers(account_id);
                        }

                        console.log('Received message:', message.body);

                    } catch (error) {
                        console.error("Error parsing message body:", error);
                    }
                }  
            });

            client.subscribe(`/topic/accounts-autocomplete/${account_id}`, (message) => {

                if (message.body) {

                    try {
                        const jsonBody = JSON.parse(message.body);
        
                        console.log("Autocomplete suggestions:" + jsonBody);

                    } catch (error) {
                        console.error("Error parsing message body:", error);
                    }
                }
        
            });
            
        };
        

        client.onDisconnect = () => {
            console.log('Disconnected from WebSocket');
        };

        client.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.activate();

        return () => {
            client.deactivate();
        }

    }, [account_id]);

    return null;
    
};

export default TransferWebSocketConfig;