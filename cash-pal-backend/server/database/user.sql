-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER cashpal_owner
WITH PASSWORD 'postgres1';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO cashpal_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO cashpal_owner;

CREATE USER cashpal_user
WITH PASSWORD 'postgres1';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO cashpal_user;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO cashpal_user;