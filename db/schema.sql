DROP DATABASE IF EXISTS fec;

CREATE DATABASE fec;

USE fec;

DROP TABLE IF EXISTS items;

CREATE TABLE item (
  id int NOT NULL AUTO_INCREMENT,
  itemName VARCHAR(255) DEFAULT NULL,
  price INTEGER DEFAULT NULL,
  numberOfReviews INTEGER  DEFAULT NULL,
  averageStarRating INTEGER  DEFAULT NULL,
  availableOnPrime bit  DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id int NOT NULL AUTO_INCREMENT,
    text VARCHAR(255) DEFAULT NULL,
    headline VARCHAR(255) DEFAULT NULL,
    photoUrl VARCHAR(255) DEFAULT NULL,
    rating VARCHAR(255) DEFAULT NULL,
    id_item INTEGER DEFAULT NULL,
    FOREIGN KEY (id_item) REFERENCES item(id),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS relatedItems;

CREATE TABLE relatedItems (
    id_item1 INTEGER DEFAULT NULL,
    id_item2 INTEGER DEFAULT NULL,
    FOREIGN KEY (id_item1) REFERENCES item (id),
    FOREIGN KEY (id_item2) REFERENCES item (id)
);

DROP TABLE IF EXISTS frequentlyBoughtTogether;

CREATE TABLE frequentlyBoughtTogether (
    id_item1 INTEGER DEFAULT NULL,
    id_item2 INTEGER DEFAULT NULL,
    FOREIGN KEY (id_item1) REFERENCES item (id),
    FOREIGN KEY (id_item2) REFERENCES item (id)
);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) DEFAULT NULL,
    votes INTEGER DEFAULT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS answers;
		
CREATE TABLE answers (
  id int NOT NULL AUTO_INCREMENT,
  text VARCHAR(255) NULL DEFAULT NULL,
  username VARCHAR(255) NULL DEFAULT NULL,
  seller bit DEFAULT NULL,
  id_questions INTEGER DEFAULT NULL,
  date DATETIME DEFAULT NULL,
  FOREIGN KEY (id_questions) REFERENCES questions (id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS featureRatings;
		
CREATE TABLE featureRatings (
  id INTEGER NOT NULL AUTO_INCREMENT,
  typeOfFeature VARCHAR(255) DEFAULT NULL,
  rating INTEGER DEFAULT NULL,
  id_reviews INTEGER DEFAULT NULL,
  FOREIGN KEY (id_reviews) REFERENCES reviews (id),
  PRIMARY KEY (id)
);