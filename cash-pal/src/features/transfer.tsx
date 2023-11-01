import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transfer {
    amount: number;
    transfer_id: number;
    transfer_status: string;
    sender_id: number;
    sender_username: string;
    receiver_id: number;
    receiver_username: string;
    time_sent: Date | null;
}

export interface TransferState {
    transfer: Transfer;
    transfers: Transfer[];
};

const initialStateValue: TransferState = {
    transfer: {
        amount: 0,
        transfer_id: 0,
        transfer_status: '',
        sender_id: 0,
        sender_username: '',
        receiver_id: 0,
        receiver_username: '',
        time_sent: null
    },
    transfers: []
};

export const transferSlice = createSlice({
    name: 'transfer',
    initialState: initialStateValue,
    reducers: {
        updateTransfers: (state, action: PayloadAction<Transfer[]>) => {
            state.transfers = action.payload;
        },
        addTransfer: (state) => {
            state.transfers.push(state.transfer);
            state.transfer =  {
                amount: 0,
                transfer_id: 0,
                transfer_status: '',
                sender_id: 0,
                sender_username: '',
                receiver_id: 0,
                receiver_username: '',
                time_sent: null
            };
        },
        clearTransferHistory: (state) => {
            state.transfers = [];
        },
        setAmount: (state, action: PayloadAction<number>) => {
            if(state.transfer)
                state.transfer.amount = action.payload
        },
        setTransferId: (state, action: PayloadAction<number>) => {
            if(state.transfer)
                state.transfer.transfer_id = action.payload;
        },
        setTransferStatus: (state, action: PayloadAction<string>) => {
            if(state.transfer)
                state.transfer.transfer_status = action.payload;
        },
        setSenderId: (state, action: PayloadAction<number>) => {
            if(state.transfer)
                state.transfer.sender_id = action.payload;
        },
        setSenderUsername: (state, action: PayloadAction<string>) => {
            if(state.transfer)
                state.transfer.sender_username = action.payload;
        },
        setReceiverId: (state, action: PayloadAction<number>) => {
            if(state.transfer)
                state.transfer.receiver_id = action.payload;
        },
        setReceiverUsername: (state, action: PayloadAction<string>) => {
            if(state.transfer)
                state.transfer.receiver_username = action.payload;
        },
        setTimeSent: (state, action: PayloadAction<Date | null>) => {
            if(state.transfer)
                state.transfer.time_sent = action.payload;
        }
    },
});

export const {
    setAmount,
    setTransferId,
    setTransferStatus,
    setSenderId,
    setSenderUsername,
    setReceiverId,
    setReceiverUsername,
    setTimeSent,
    addTransfer,
    updateTransfers,
    clearTransferHistory
} = transferSlice.actions;


export default transferSlice.reducer;