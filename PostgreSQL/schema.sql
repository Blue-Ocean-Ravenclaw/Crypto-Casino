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
  tokens BIGINT NULL DEFAULT NULL,
  phone_number VARCHAR NULL DEFAULT NULL,
  wallet_address VARCHAR NULL DEFAULT NULL
);
COPY users(id, username, tokens, phone_number, wallet_address)
FROM '/Users/varun/Documents/rfp2202/BlueOcean/Blue-Ocean-Ravenclaw/fakeData/user.csv'
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

COPY nfts(id, id_user, description, image, external_url, name, value)

FROM '/Users/varun/Documents/rfp2202/BlueOcean/Blue-Ocean-Ravenclaw/fakeData/nfts.csv'
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
FROM '/Users/varun/Documents/rfp2202/BlueOcean/Blue-Ocean-Ravenclaw/fakeData/card_inventory.csv'
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

-- INSERT INTO `user` (`id`,`username`,`tokens`,`phone_number`,`wallet_address`) VALUES
-- ('','','','','');
-- INSERT INTO `nfts` (`id`,`id_user`,`description`,`external_url`,`image`,`name`,`value`) VALUES
-- ('','','','','','','');
-- INSERT INTO `card_inventory` (`id`,`id_user`,`card_name`,`quantity`) VALUES
-- ('','','','');