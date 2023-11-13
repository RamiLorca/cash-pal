package com.rnr.cashpal.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rnr.cashpal.dao.AccountDao;
import com.rnr.cashpal.model.Account;
import com.rnr.cashpal.model.GetAllAccountsDTO;
import com.rnr.cashpal.model.UsernameSearchDTO;
import com.rnr.cashpal.websocket.WebSocketMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private WebSocketMessage message;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

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

    @MessageMapping("/accounts-autocomplete")
    @RequestMapping(path = "/accounts/autocomplete", method = RequestMethod.POST)
    public void getAutoCompleteSuggestions(@RequestBody UsernameSearchDTO usernameSearchDTO) {

        try {
            int accountId = usernameSearchDTO.getAccountId();

            List<String> suggestions = accountDao.getAutoCompleteSuggestions(usernameSearchDTO.getUsernameInput());

            ObjectMapper objectMapper = new ObjectMapper();
            String suggestionJson = objectMapper.writeValueAsString(suggestions);
            messagingTemplate.convertAndSend("/topic/accounts-autocomplete/" + accountId, suggestionJson);

        } catch (DataAccessException | JsonProcessingException e) {
            System.out.println(e.getMessage());
        }
    }

    @RequestMapping(path = "/accounts/username/{username}", method = RequestMethod.GET)
    public Account getAccountByUsername(@PathVariable String username) {
        return accountDao.findByUsername(username);
    }

}
