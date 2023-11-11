package com.rnr.cashpal.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UsernameSearchDTO {

    @JsonProperty("username_input")
    private String usernameInput;

    @JsonProperty("account_id")
    private int accountId;


    public String getUsernameInput() {
        return usernameInput;
    }

    public void setUsernameInput(String usernameInput) {
        this.usernameInput = usernameInput;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }
}
