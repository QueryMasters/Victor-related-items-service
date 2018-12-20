-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Reviews'
-- 
-- ---

DROP TABLE IF EXISTS `Reviews`;
		
CREATE TABLE `Reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Text` VARCHAR NULL DEFAULT NULL,
  `Headline` VARCHAR NULL DEFAULT NULL,
  `photoUrl` VARCHAR NULL DEFAULT NULL,
  `Rating` INTEGER NULL DEFAULT NULL,
  `id_Item` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Item'
-- 
-- ---

DROP TABLE IF EXISTS `Item`;
		
CREATE TABLE `Item` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Item Name` VARCHAR NULL DEFAULT NULL,
  `Price` INTEGER NULL DEFAULT NULL,
  `number of reviews` INTEGER NULL DEFAULT NULL,
  `average star rating` INTEGER NULL DEFAULT NULL,
  `available on prime` bit NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Related Items'
-- 
-- ---

DROP TABLE IF EXISTS `Related Items`;
		
CREATE TABLE `Related Items` (
  `id_Item` INTEGER NULL DEFAULT NULL,
  `id_Item` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY ()
);

-- ---
-- Table 'Frequently Bought Together'
-- 
-- ---

DROP TABLE IF EXISTS `Frequently Bought Together`;
		
CREATE TABLE `Frequently Bought Together` (
  `id_Item` INTEGER NULL DEFAULT NULL,
  `id_Item` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY ()
);

-- ---
-- Table 'Questions'
-- 
-- ---

DROP TABLE IF EXISTS `Questions`;
		
CREATE TABLE `Questions` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Title` VARCHAR NULL DEFAULT NULL,
  `votes` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Answers'
-- 
-- ---

DROP TABLE IF EXISTS `Answers`;
		
CREATE TABLE `Answers` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR NULL DEFAULT NULL,
  `username` VARCHAR NULL DEFAULT NULL,
  `seller` bit NULL DEFAULT NULL,
  `id_Questions` INTEGER NULL DEFAULT NULL,
  `Date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Feature Ratings'
-- 
-- ---

DROP TABLE IF EXISTS `Feature Ratings`;
		
CREATE TABLE `Feature Ratings` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Type of Feature` VARCHAR NULL DEFAULT NULL,
  `Rating` INTEGER NULL DEFAULT NULL,
  `id_Reviews` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Reviews` ADD FOREIGN KEY (id_Item) REFERENCES `Item` (`id`);
ALTER TABLE `Related Items` ADD FOREIGN KEY (id_Item) REFERENCES `Item` (`id`);
ALTER TABLE `Related Items` ADD FOREIGN KEY (id_Item) REFERENCES `Item` (`id`);
ALTER TABLE `Frequently Bought Together` ADD FOREIGN KEY (id_Item) REFERENCES `Item` (`id`);
ALTER TABLE `Frequently Bought Together` ADD FOREIGN KEY (id_Item) REFERENCES `Item` (`id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (id_Questions) REFERENCES `Questions` (`id`);
ALTER TABLE `Feature Ratings` ADD FOREIGN KEY (id_Reviews) REFERENCES `Reviews` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Item` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Related Items` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Frequently Bought Together` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Feature Ratings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Reviews` (`id`,`Text`,`Headline`,`photoUrl`,`Rating`,`id_Item`) VALUES
-- ('','','','','','');
-- INSERT INTO `Item` (`id`,`Item Name`,`Price`,`number of reviews`,`average star rating`,`available on prime`) VALUES
-- ('','','','','','');
-- INSERT INTO `Related Items` (`id_Item`,`id_Item`) VALUES
-- ('','');
-- INSERT INTO `Frequently Bought Together` (`id_Item`,`id_Item`) VALUES
-- ('','');
-- INSERT INTO `Questions` (`id`,`Title`,`votes`) VALUES
-- ('','','');
-- INSERT INTO `Answers` (`id`,`text`,`username`,`seller`,`id_Questions`,`Date`) VALUES
-- ('','','','','','');
-- INSERT INTO `Feature Ratings` (`id`,`Type of Feature`,`Rating`,`id_Reviews`) VALUES
-- ('','','','');