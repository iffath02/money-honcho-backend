CREATE DATABASE money_honcho;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_digest TEXT NOT NULL
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE user_category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id Integer REFERENCES users(id)
);

CREATE TABLE income (
    id SERIAL PRIMARY KEY,
    user_id Int,
    type TEXT,
    amount decimal,

    CONSTRAINT FK_user FOREIGN KEY(user_id)
        REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id Integer REFERENCES users(id),
    category_id Integer REFERENCES category(id),
    spent_on Text,
    amount decimal     
);

CREATE TABLE budget_plan(
    id SERIAL PRIMARY KEY,
    user_id Integer REFERENCES users(id),
    name TEXT,
    amount decimal,
    date date
);
