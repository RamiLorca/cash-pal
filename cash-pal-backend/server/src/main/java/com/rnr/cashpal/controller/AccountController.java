package com.rnr.cashpal.controller;

import com.rnr.cashpal.dao.AccountDao;
import com.rnr.cashpal.model.Account;
import com.rnr.cashpal.model.AddToBalanceDTO;
import com.rnr.cashpal.model.GetAllAccountsDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@CrossOrigin
public class AccountController {
    private AccountDao accountDao;

    public AccountController(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @RequestMapping(path = "/accounts/{accountId}", method = RequestMethod.GET)
    public Account getBalance(@PathVariable int accountId, Principal principal) {
        if (accountDao.verifyAccount(accountId, principal.getName())) {
            return accountDao.getAccountById(accountId);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username did not match");
        }
    }

    @RequestMapping(path = "/get-users", method = RequestMethod.GET)
    public List<GetAllAccountsDTO> getAllAccounts() {
        return accountDao.getAllAccounts();
    }

    @RequestMapping(path = "/accounts/autocomplete", method = RequestMethod.GET)
    public List<String> getAutoCompleteSuggestions(@RequestParam("query") String query) {
        return accountDao.getAutoCompleteSuggestions(query);
    }

    @RequestMapping(path = "/accounts/username/{username}", method = RequestMethod.GET)
    public Account getAccountByUsername(@PathVariable String username) {
        return accountDao.findByUsername(username);
    }

    @RequestMapping(path = "/accounts/addfunds", method = RequestMethod.PUT)
    public BigDecimal addFundsToAccount(@RequestBody AddToBalanceDTO dto) {
        int accountId = dto.getAccountId();
        BigDecimal amount = dto.getAmount();

        accountDao.updateAccountBalance(accountId, amount);

        return accountDao.addToBalance(accountId, amount);
    }
}
