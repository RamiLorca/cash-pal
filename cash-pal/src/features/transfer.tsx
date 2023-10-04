import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transfer {
    amount: number;
    transfer_id: number;
    transfer_status: string;
    sender_id: number;
    receiver_id: number;
    time_sent: Date | null;
}



export interface TransferState {
    transfer: Transfer,
    transfers: Transfer[]
};

const initialStateValue: TransferState = {
    transfer: {
        amount: 0,
        transfer_id: 0,
        transfer_status: '',
        sender_id: 0,
        receiver_id: 0,
        time_sent: null
    },
    transfers: []
};

export const transferSlice = createSlice({
    name: 'transfer',
    initialState: initialStateValue,
    reducers: {
        addTransfer: (state) => {
            state.transfers.push(state.transfer);
            state.transfer =  {
                amount: 0,
                transfer_id: 0,
                transfer_status: '',
                sender_id: 0,
                receiver_id: 0,
                time_sent: null
            };
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
        setReceiverId: (state, action: PayloadAction<number>) => {
            if(state.transfer)
                state.transfer.receiver_id = action.payload;
        },
        setTimeSent: (state, action: PayloadAction<Date>) => {
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
    setReceiverId,
    setTimeSent,
    addTransfer
} = transferSlice.actions;

export default transferSlice.reducer;