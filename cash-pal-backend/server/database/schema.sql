BEGIN TRANSACTION;

DROP TABLE IF EXISTS account, transfer CASCADE;
DROP SEQUENCE IF EXISTS seq_account_id, seq_transfer_id;

CREATE SEQUENCE seq_account_id
    INCREMENT BY 1
    START WITH 2004
    NO MAXVALUE;

CREATE TABLE account (
    account_id int NOT NULL DEFAULT nextval('seq_account_id'),
    username varchar(50) NOT NULL,
    role varchar(50) NOT NULL,
    password_hash varchar(200) NOT NULL,
    balance numeric(13, 2) NOT NULL,
    CONSTRAINT UQ_username UNIQUE (username),
    CONSTRAINT PK_account PRIMARY KEY (account_id)
);
-- Sequence to start transfer_id values at 3001 instead of 1
-- Note: Use similar sequences with unique starting values for additional tables
CREATE SEQUENCE seq_transfer_id
    INCREMENT BY 1
    START WITH 3004
    NO MAXVALUE;

CREATE TABLE transfer (
    transfer_id int NOT NULL DEFAULT nextval('seq_transfer_id'),
    transfer_status varchar(50) NOT NULL,
	initiator_username varchar(50) NOT NULL,
    sender_id int NOT NULL,
	sender_username varchar(50) NOT NULL,
    receiver_id int NOT NULL,
	receiver_username varchar(50) NOT NULL,
    amount numeric(13, 2) NOT NULL,
    time_sent timestamp NOT NULL,
    CONSTRAINT PK_transfer PRIMARY KEY (transfer_id)
);

--Adding Foreign Key Constraints--
ALTER TABLE transfer ADD CONSTRAINT FK_acount_sender FOREIGN KEY (sender_id) REFERENCES account (account_id);
ALTER TABLE transfer ADD CONSTRAINT FK_acount_receiver FOREIGN KEY (receiver_id) REFERENCES account (account_id);

COMMIT TRANSACTION;