package com.rnr.cashpal.dao;

import com.rnr.cashpal.model.Transfer;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

public interface TransferDao {

    public boolean initiateTransfer(String initiatorUsername, int senderId, String senderUsername, int receiverId, String receiverUsername, BigDecimal amount);

    public boolean acceptTransfer(int transferId);

    public boolean cancelTransfer(int transferId, Principal principal);

   // public boolean acceptOrReject(int transferId, boolean isAccepted);

    public List<Transfer> getTransfersListByAccountId(int accountId);

    public Transfer getTransferDetailsById(int transferId);

    public List<Transfer> getPendingTransfersByAccountId(int accountId);
}
