import { Client } from '@stomp/stompjs';

const TransferWebSocketConfig = () => {

    const client = new Client({
        brokerURL: 'ws://localhost:8080/transfers-websocket',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
        console.log('Connected to WebSocket');
        client.subscribe('/topic/transfer-updates', (message) => {
            if(message.body) {
                var jsonBody = JSON.parse(message.body);
                if (jsonBody.message) {
                    console.log("Received message: " + jsonBody.message);
                }
            }
            console.log('Received message:', message.body);
        });
    };

    client.onDisconnect = () => {
        console.log('Disconnected from WebSocket');
        // Add actions to perform when disconnected
    };

    client.onStompError = (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate();

    return (
        <div>
          <h1> Websocket Component </h1>
        </div>
      )
};

export default TransferWebSocketConfig;