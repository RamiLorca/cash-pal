package com.rnr.cashpal.controller;

import com.rnr.cashpal.dao.AccountDao;
import com.rnr.cashpal.model.Account;
import com.rnr.cashpal.model.GetAllAccountsDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@CrossOrigin
public class AccountController {
    private AccountDao accountDao;

    public AccountController (AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @RequestMapping(path = "/accounts/{accountId}", method = RequestMethod.GET)
    public Account getBalance(@PathVariable int accountId, Principal principal) {
        if (accountDao.verifyAccount(accountId, principal.getName())) {
            return accountDao.getAccountById(accountId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username did not match");
        }
    }

    @RequestMapping(path = "/get-users", method = RequestMethod.GET)
    public List<GetAllAccountsDTO> getAllAccounts() {
        return accountDao.getAllAccounts();
    }
}

