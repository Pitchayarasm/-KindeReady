
DROP DATABASE IF EXISTS kindeReady_db;

CREATE DATABASE kindeReady_db;

USE kinderReady_db;

CREATE TABLE users (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	firstName VARCHAR( 255) NOT NULL,
    lastName VARCHAR( 255) NOT NULL,
    email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY (id)
);

CREATE TABLE student (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	firstName VARCHAR( 255) NOT NULL,
    lastName VARCHAR( 255) NOT NULL,
    age INTEGER NOT NULL,
	imageName MEDIUMBLOB NOT NULL,
    userID VARCHAR(255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY (id)
);