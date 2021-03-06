CREATE ROLE root WITH LOGIN;
CREATE DATABASE root;
GRANT ALL PRIVILEGES ON DATABASE root TO root;

-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS fit_rpg;

-- Create the db
CREATE DATABASE fit_rpg;
GRANT ALL PRIVILEGES ON DATABASE fit_rpg TO fitadmin;

-- Move into the db
\c fit_rpg

CREATE TABLE IF NOT EXISTS players (
	username VARCHAR ( 50 ) PRIMARY KEY,
	level int UNIQUE NOT NULL,
    characterId VARCHAR (50) NOT NULL,
    warmth FLOAT DEFAULT 10,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characters (
    characterId VARCHAR (50),
    image VARCHAR (50),
    warmthCoeff FLOAT
);

CREATE TABLE IF NOT EXISTS activities (
    activity VARCHAR(50) PRIMARY KEY,
    value int NOT NULL
);

CREATE TABLE IF NOT EXISTS player_activities (
	username VARCHAR ( 50 ) NOT NULL,
    activityId VARCHAR(50) NOT NULL,
	activity_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO characters (characterId, image, warmthCoeff)
VALUES ('avatar1', 'avatar1.png', 1.0),
('avatar2', 'avatar1.png', 0.8),
('avatar2', 'avatar1.png', 1.2)

-- INSERT INTO players (username, level)
-- VALUES ('ghost', 5),
-- ('ya_boi_colin', 6)


-- -- Changes the owner of the table to postgres which is the default when installing postgres
-- ALTER TABLE Translations
--     OWNER to postgres;
