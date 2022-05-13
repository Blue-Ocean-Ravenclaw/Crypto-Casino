-- run below command in terminal
-- psql -h localhost -d dbName -f relativeFilePath
-- change filepath for all FROM to be yours

--create db
DROP DATABASE blueocean;
CREATE DATABASE blueocean;

--connect to the db
\c blueocean

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  username VARCHAR NULL DEFAULT NULL,
  tokens BIGINT NULL DEFAULT 500,
  email VARCHAR NULL DEFAULT NULL,
  wallet_address VARCHAR NULL DEFAULT NULL
);
COPY users(id, username, tokens, email, wallet_address)
FROM '/Users/kateanderson/Desktop/HRCoding/RFP2202/Blue Ocean/Blue-Ocean-Ravenclaw/fakeData/user.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'nfts'
--
-- ---

DROP TABLE IF EXISTS nfts;

CREATE TABLE nfts (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  id_user INTEGER NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  external_url VARCHAR NULL DEFAULT NULL,
  image VARCHAR NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  value INT NULL DEFAULT NULL
);

COPY nfts(id, id_user, description, external_url, image, name, value)
FROM '/Users/kateanderson/Desktop/HRCoding/RFP2202/Blue Ocean/Blue-Ocean-Ravenclaw/fakeData/nfts.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'card_inventory'
--
-- ---

DROP TABLE IF EXISTS card_inventory;

CREATE TABLE card_inventory (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  id_user INTEGER NULL DEFAULT NULL,
  card_name VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL
);
COPY card_inventory(id, id_user, card_name, quantity)
FROM '/Users/kateanderson/Desktop/HRCoding/RFP2202/Blue Ocean/Blue-Ocean-Ravenclaw/fakeData/card_inventory.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Foreign Keys
-- ---

ALTER TABLE nfts ADD FOREIGN KEY (id_user) REFERENCES users (id);
ALTER TABLE card_inventory ADD FOREIGN KEY (id_user) REFERENCES users (id);


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `nfts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `card_inventory` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `user` (`id`,`username`,`tokens`,`email`,`wallet_address`) VALUES
-- ('','','','','');
-- INSERT INTO `nfts` (`id`,`id_user`,`description`,`external_url`,`image`,`name`,`value`) VALUES
-- ('','','','','','','');
-- INSERT INTO `card_inventory` (`id`,`id_user`,`card_name`,`quantity`) VALUES
-- ('','','','');

--Sets value(id) of users/card inventory so that net row can be inserted at end of dataset.
SELECT setval('users_id_seq', (SELECT MAX(id) from users) +1);
SELECT setval('card_inventory_id_seq', (SELECT MAX(id) from card_inventory) +1);

-- Creates a unique index to identify conflicts when inserting. If conflicts are identified, we update instead. See query in '/api/cards/[username]' for more detail.
CREATE UNIQUE index idx_card_inventory_iduser_card_name ON card_inventory (id_user, card_name);
