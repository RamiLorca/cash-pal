package com.rnr.cashpal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import java.math.BigDecimal;

public class Account {
    @JsonProperty("account_id")
    private int accountId;
    private String username;
    private String password;
    private boolean activated;
    private Set<Authority> authorities = new HashSet<>();
    private BigDecimal balance;

    public Account() { }

    public Account(int accountId, String username, BigDecimal balance, String password, String authorities) {
        this.accountId = accountId;
        this.username = username;
        this.balance = balance;
        this.password = password;
        this.activated = true;
    }

    public Account(int accountId, String username, String password, String authorities) {
        this.accountId = accountId;
        this.username = username;
        this.password = password;
        this.activated = true;
    }

    public Account(int accountId, String username, BigDecimal balance) {
        this.accountId = accountId;
        this.username = username;
        this.balance = balance;
    }

    public Account(String username, BigDecimal balance) {
        this.username = username;
        this.balance = balance;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void setAuthorities(String authorities) {
        String[] roles = authorities.split(",");
        for(String role : roles) {
            this.authorities.add(new Authority("ROLE_" + role));
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return accountId == account.accountId &&
                activated == account.activated &&
                Objects.equals(username, account.username) &&
                Objects.equals(password, account.password) &&
                Objects.equals(authorities, account.authorities);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountId, username, password, activated, authorities);
    }

    @Override
    public String toString() {
        return "Account{" +
                "account_id=" + accountId +
                ", username='" + username + '\'' +
                ", balance=" + balance +
                ", activated=" + activated +
                ", authorities=" + authorities +
                '}';
    }
}
