DROP DATABASE IF EXISTS fec;

CREATE DATABASE fec;

USE fec;

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS item;

CREATE TABLE item (
  id int NOT NULL AUTO_INCREMENT,
  itemName VARCHAR(255) DEFAULT NULL,
  price INTEGER DEFAULT NULL,
  numberOfReviews INTEGER DEFAULT NULL,
  averageStarRating INTEGER DEFAULT NULL,
  availableOnPrime bit  DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
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

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id int NOT NULL AUTO_INCREMENT,
    body VARCHAR(5000) DEFAULT NULL,
    headline VARCHAR(255) DEFAULT NULL,
    photoUrl VARCHAR(255) DEFAULT NULL,
    rating VARCHAR(255) DEFAULT NULL,
    id_item INTEGER DEFAULT NULL,
    FOREIGN KEY (id_item) REFERENCES item(id),
    PRIMARY KEY (id)
);