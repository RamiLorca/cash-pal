package com.techelevator.dao;

import com.rnr.cashpal.dao.JdbcAccountDao;
import com.rnr.cashpal.model.Account;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class JdbcUserDaoTests extends BaseDaoTests{

    private JdbcAccountDao sut;

    @Before
    public void setup() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        sut = new JdbcAccountDao(jdbcTemplate);
    }

    @Test
    public void findIdByUsernameTest() {
        int accountId = sut.findIdByUsername("eric_cameron_1");
        Assert.assertEquals(1001, accountId);
    }

    @Test
    public void findAllTest() {
        List<Account> actual = sut.findAll();
        int actualSize = actual.size();
        Assert.assertEquals(3, actualSize);
    }
}
