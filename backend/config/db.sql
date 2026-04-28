
-- drop existing tables 
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

-- stores registered users of the app
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(100)  NOT NULL UNIQUE,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---- Movies Table ----
CREATE TABLE movies (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  title       VARCHAR(255)  NOT NULL,
  genre       VARCHAR(100)  NOT NULL,
  rating      NUMERIC(3,1)  CHECK (rating >= 1 AND rating <= 10),
  notes       TEXT,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);