package com.rnr.cashpal.model;

import java.math.BigDecimal;

public class AddToBalanceDTO {
    public int accountId;
    public BigDecimal amount;

    public AddToBalanceDTO(int accountId, BigDecimal amount) {
        this.accountId = accountId;
        this.amount = amount;
    }

    public AddToBalanceDTO() {
    }

    public int getAccountId() {
        return accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }
}
