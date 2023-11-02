package com.rnr.cashpal.controller;

import com.rnr.cashpal.dao.AccountDao;
import com.rnr.cashpal.dao.TransferDao;
import com.rnr.cashpal.model.AcceptOrRejectTransferDTO;
import com.rnr.cashpal.model.Transfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@CrossOrigin
public class TransferController {

    private TransferDao transferDao;
    private AccountDao accountDao;

    private final SimpMessagingTemplate messagingTemplate;


    @Autowired
    public TransferController(TransferDao transferDao, AccountDao accountDao, SimpMessagingTemplate messagingTemplate) {
        this.transferDao = transferDao;
        this.accountDao = accountDao;
        this.messagingTemplate = messagingTemplate;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/transfer", method = RequestMethod.POST)
    public void initiateTransfer(@RequestBody Transfer transfer) {

        String initiatorUsername = transfer.getInitiatorUsername();
        int senderId = transfer.getSenderId();
        String senderUsername = transfer.getSenderUsername();
        int receiverId = transfer.getReceiverId();
        String receiverUsername = transfer.getReceiverUsername();
        BigDecimal amount = transfer.getAmount();

        System.out.println(transfer);

        try{
            boolean result = transferDao.initiateTransfer(initiatorUsername, senderId, senderUsername, receiverId, receiverUsername, amount);

            if (result && initiatorUsername.equals(senderUsername)){
                BigDecimal newSenderBalance = accountDao.subtractFromBalance(senderId, amount);
                BigDecimal newReceiverBalance = accountDao.addToBalance(receiverId, amount);

                accountDao.updateAccountBalance(senderId, newSenderBalance);
                accountDao.updateAccountBalance(receiverId, newReceiverBalance);

                //websocket sends updated balance
                messagingTemplate.convertAndSendToUser(senderUsername, "/queue/balance", newSenderBalance);
            }

            if(!result) {
                System.out.println(transfer);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Transfer initialization failed.");
            }
        }
        catch (DataAccessException e) {
            System.out.println(e.getMessage());
        }
    }

    @RequestMapping(path = "/transfers/{accountId}", method = RequestMethod.GET)
    public List<Transfer> getMyTransfers (@PathVariable Integer accountId) {
        List<Transfer> transfers = transferDao.getTransfersListByAccountId(accountId);

        if (transfers == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No transfers found.");
        }
        else {
            return transfers;
        }
    }

    @RequestMapping(path = "/transfer/{transferId}", method = RequestMethod.GET)
    public Transfer getTransfer (@PathVariable Integer transferId) {
        Transfer transfer = transferDao.getTransferDetailsById(transferId);

        if (transfer == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transfer not found.");
        }
        else {
            return transfer;
        }
    }

    @RequestMapping(path = "/transfers/{accountId}/pending", method = RequestMethod.GET)
    public List<Transfer> getMyPendingTransfers (@PathVariable Integer accountId) {
        List<Transfer> transfers = transferDao.getPendingTransfersByAccountId(accountId);

        if (transfers == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No transfers found.");
        }
        else {
            return transfers;
        }
    }
    //used to have OK response annotation here
    @RequestMapping(path = "/transfer", method = RequestMethod.PUT)
    public void acceptOrRejectTransfer (@RequestBody AcceptOrRejectTransferDTO transferDTO, Principal principal) {
        Transfer transfer = transferDao.getTransferDetailsById(transferDTO.getTransferId());

        if (transferDTO.isAccepted()) {
            BigDecimal newSenderBalance = accountDao.subtractFromBalance(transfer.getSenderId(), transfer.getAmount());
            BigDecimal newReceiverBalance = accountDao.addToBalance(transfer.getReceiverId(), transfer.getAmount());

            accountDao.updateAccountBalance(transfer.getSenderId(), newSenderBalance);
            accountDao.updateAccountBalance(transfer.getReceiverId(), newReceiverBalance);

            transferDao.acceptTransfer(transfer.getTransferId());

            //websocket sends updated balance
            messagingTemplate.convertAndSendToUser(transfer.getSenderUsername(), "/queue/balance", newSenderBalance);
        }
        else {
            transferDao.cancelTransfer(transfer.getTransferId(), principal);
        }
    }

}
