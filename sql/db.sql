CREATE TABLE IF NOT EXISTS article (
  id SERIAL,
  price real NOT NULL,
  description text,
  image text,
  PRIMARY KEY (id)
);