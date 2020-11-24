
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
);

CREATE TABLE "brews" (
	"id" SERIAL PRIMARY KEY,
	"origin" varchar (50),
	"roast" varchar (50),
	"grind" varchar (50),
	"coffee_amount" varchar (50),
	"water_amount" varchar (50),
	"brew_method" varchar (50),
	"taste" varchar (50),
	"aroma" varchar (50),
	"body" varchar (50),
	"mouth_feel" varchar (50),
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "times" (
	"id" SERIAL PRIMARY KEY,
	"centiseconds" INT,
	"seconds" INT,
	"minutes" INT,
	"brew_id" INT REFERENCES "brews" ON DELETE CASCADE NOT NULL
);

