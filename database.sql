-- Written in camelCase in honor of my instructor :apple:

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (255),
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "anticipation" (
    "id" SERIAL PRIMARY KEY,
    "value" INT UNIQUE,
    "name" varchar(255) NOT NULL,
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "userIdA" INT REFERENCES "user",
    "userIdB" INT REFERENCES "user",
    "isConfirmed" BOOLEAN DEFAULT TRUE,
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE ("userIdA", "userIdB")
);

CREATE TABLE "viewing" (
    "id" SERIAL PRIMARY KEY,
    "movieId" INT,
    "viewingDate" TIMESTAMP,
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "userMovieAnticipation" (
    "id" SERIAL PRIMARY KEY,
    "movieId" INT,
  	"userId" INT REFERENCES "user",
    "anticipationId" INT,
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "userViewing" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "user",
    "viewingId" INT REFERENCES "viewing",
    "isHost" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "genres" (
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "anticipation" 
	( "name", "value" ) 
VALUES
    ( 'Very High', 5 ),
    ( 'High', 4 ),
    ( 'Average', 3 ),
    ( 'Low', 2 ),
    ( 'Very Low', 1 );