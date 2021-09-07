
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Written in camelCase in honor of my instructor :apple:

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (255),
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "anticipation" (
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "userIdA" INT REFERENCES "user"."id",
    "userIdB" INT REFERENCES "user"."id",
    "isConfirmed" BOOLEAN DEFAULT TRUE,
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "viewing" (
    "id" SERIAL PRIMARY KEY,
    "movieId"
)