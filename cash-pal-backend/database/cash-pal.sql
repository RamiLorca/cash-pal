BEGIN TRANSACTION;
DROP TABLE IF EXISTS account, transfer CASCADE;
DROP SEQUENCE IF EXISTS seq_account_id, seq_transfer_id;

CREATE SEQUENCE seq_account_id
  INCREMENT BY 1
  START WITH 2001
  NO MAXVALUE;
CREATE TABLE account (
    account_id int NOT NULL DEFAULT nextval('seq_account_id'),
    username varchar(50) NOT NULL,
    password_hash varchar(200) NOT NULL,
    balance numeric(13, 2) NOT NULL,
    CONSTRAINT UQ_username UNIQUE (username),
    CONSTRAINT PK_account PRIMARY KEY (account_id)
);
-- Sequence to start transfer_id values at 3001 instead of 1
-- Note: Use similar sequences with unique starting values for additional tables
CREATE SEQUENCE seq_transfer_id
  INCREMENT BY 1
  START WITH 3001
  NO MAXVALUE;
CREATE TABLE transfer (
    transfer_id int NOT NULL DEFAULT nextval('seq_transfer_id'),
    transfer_status varchar(50) NOT NULL,
    sender_id int NOT NULL,
    receiver_id int NOT NULL,
    amount numeric(13, 2) NOT NULL,
    time_sent timestamp NOT NULL,
    CONSTRAINT PK_transfer PRIMARY KEY (transfer_id)
);
--Adding Foreign Key Constraints--
ALTER TABLE transfer ADD CONSTRAINT FK_acount_sender FOREIGN KEY (sender_id) REFERENCES account (account_id);
ALTER TABLE transfer ADD CONSTRAINT FK_acount_receiver FOREIGN KEY (receiver_id) REFERENCES account (account_id);

--Adding Accounts--
INSERT INTO account (username, password_hash, balance)
    VALUES ('eric_cameron_1', '$2a$10$eO6WQbesPXmpCsWQ2qK9OOKK9dpZ5tQORLaX9afr26nIkMZm8dXPe', 100);
INSERT INTO account (username, password_hash, balance)
    VALUES ('sean_oberc_2', '$2a$10$tjFqrGHBrjaihjbq9/IOf.o3XRj7ePan0fNOCAZBQ4c8Ibr1xFJsW', 500);
INSERT INTO account (username, password_hash, balance)
    VALUES ('admin_1', '$2a$10$t4D2Htu.5/ogUiLTpKMLfOJvLqlcHfD46NxyQ3w05rN2ufjPmZKhu', 800);

--Adding Transactions--

INSERT INTO transfer (transfer_status, sender_id, receiver_id, amount, time_sent)
    VALUES ('Accepted', 2001, 2002, 50, '2023-08-31 17:06:20.24378');

INSERT INTO transfer (transfer_status, sender_id, receiver_id, amount, time_sent)
    VALUES ('Pending', 2003, 2001, 100, '2023-08-31 17:06:20.24378');

INSERT INTO transfer (transfer_status, sender_id, receiver_id, amount, time_sent)
    VALUES ('Cancelled', 2002, 2001, 100, '2023-08-31 17:06:20.24378');

COMMIT;



