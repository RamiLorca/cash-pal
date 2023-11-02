package com.rnr.cashpal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@SpringBootApplication
@EnableWebSocket
public class CashPalApplication {

    public static void main(String[] args) {
        SpringApplication.run(CashPalApplication.class, args);
    }

}
