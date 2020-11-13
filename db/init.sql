CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL, 
    password VARCHAR(20) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(45) NOT NULL,
    img TEXT,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES user(id)
);