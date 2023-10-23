BEGIN TRANSACTION;

--Adding Accounts--
INSERT INTO account (username, role, password_hash, balance)
    VALUES ('eric_cameron_1', 'ROLE_USER', '$2a$10$eO6WQbesPXmpCsWQ2qK9OOKK9dpZ5tQORLaX9afr26nIkMZm8dXPe', 100);
INSERT INTO account (username, role, password_hash, balance)
    VALUES ('sean_oberc_2', 'ROLE_USER', '$2a$10$tjFqrGHBrjaihjbq9/IOf.o3XRj7ePan0fNOCAZBQ4c8Ibr1xFJsW', 500);
INSERT INTO account (username, role, password_hash, balance)
    VALUES ('admin_1', 'ROLE_ADMIN', '$2a$10$t4D2Htu.5/ogUiLTpKMLfOJvLqlcHfD46NxyQ3w05rN2ufjPmZKhu', 800);

--Adding Transactions--

INSERT INTO transfer (transfer_status, initiator_username, sender_id, sender_username, receiver_id, receiver_username, amount, time_sent)
    VALUES ('Completed', 'eric_cameron_1', 2001, 'eric_cameron_1', 2002, 'sean_oberc_2', 50, '2023-08-31 17:06:20.24378');

INSERT INTO transfer (transfer_status, initiator_username, sender_id, sender_username, receiver_id, receiver_username, amount, time_sent)
    VALUES ('Pending', 'admin_1', 2003, 'admin_1', 2001, 'eric_cameron_1', 100, '2023-08-31 17:06:20.24378');

INSERT INTO transfer (transfer_status, initiator_username, sender_id, sender_username, receiver_id, receiver_username, amount, time_sent)
    VALUES ('Cancelled', 'sean_oberc_2', 2002, 'sean_oberc_2', 2001, 'eric_cameron_1', 100, '2023-08-31 17:06:20.24378');

COMMIT TRANSACTION;