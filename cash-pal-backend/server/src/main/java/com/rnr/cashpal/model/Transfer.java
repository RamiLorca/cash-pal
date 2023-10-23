package com.rnr.cashpal.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Transfer {
    @JsonProperty("transfer_id")
    private int transferId;
    @JsonProperty("transfer_status")
    private String transferStatus;
    @JsonProperty("sender_id")
    private int senderId;
    @JsonProperty("receiver_id")
    private int receiverId;
    private BigDecimal amount;
    @JsonProperty("time_sent")
    private LocalDateTime timeSent;

    @JsonProperty("sender_username")
    private String senderUsername;

    @JsonProperty("receiver_username")
    private String receiverUsername;

    @JsonProperty("initiator_username")
    private String initiatorUsername;

    public Transfer() {
    }

    public Transfer(int transferId, String transferStatus, String initiatorUsername, int senderId, String senderUsername, int receiverId, String receiverUsername, BigDecimal amount, LocalDateTime timeSent) {
        this.transferId = transferId;
        this.transferStatus = transferStatus;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.amount = amount;
        this.timeSent = timeSent;
    }

    public Transfer(String transferStatus, String initiatorUsername, int senderId, String senderUsername, int receiverId, String receiverUsername, BigDecimal amount, LocalDateTime timeSent) {
        this.transferStatus = transferStatus;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.amount = amount;
        this.timeSent = timeSent;
    }

    public int getTransferId() {
        return transferId;
    }

    public void setTransferId(int transferId) {
        this.transferId = transferId;
    }

    public String getTransferStatus() {
        return transferStatus;
    }

    public void setTransferStatus(String transferStatus) {
        this.transferStatus = transferStatus;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getTimeSent() {
        return timeSent;
    }

    public void setTimeSent(LocalDateTime timeSent) {
        this.timeSent = timeSent;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getReceiverUsername() {
        return receiverUsername;
    }

    public void setReceiverUsername(String receiverUsername) {
        this.receiverUsername = receiverUsername;
    }

    public String getInitiatorUsername() {
        return initiatorUsername;
    }

    public void setInitiatorUsername(String initiatorUsername) {
        this.initiatorUsername = initiatorUsername;
    }

    @Override
    public String toString() {
        return "Transfer{" +
                "transfer_id=" + transferId +
                ", transfer_status='" + transferStatus + '\'' +
                ", sender_id=" + senderId +
                ", receiver_id=" + receiverId +
                ", amount=" + amount +
                ", time_sent=" + timeSent +
                '}';
    }
}
