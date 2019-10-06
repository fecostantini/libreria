CREATE TABLE IF NOT EXISTS article (
  id SERIAL,
  price real NOT NULL,
  description text,
  image text,
  PRIMARY KEY (id)
);

INSERT INTO article (price, description, image) VALUES (1500, 'Eloquent JavaScript, Second Edition', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (700, 'Learning JavaScript Design Patterns', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (900, 'Speaking JavaScript', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (300, 'Programming JavaScript Applications', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (2600, 'Understanding ECMAScript 6', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (4300, 'You Dont Know JS', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (2210, 'Git Pocket Guides', 'assets/images/articles/article1.png');
INSERT INTO article (price, description, image) VALUES (1160, 'Designing Evolvable Web APIs with ASP.NET', 'assets/images/articles/article1.png');