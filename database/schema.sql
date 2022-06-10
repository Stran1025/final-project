set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."sudokus" (
	"sudokuId" serial NOT NULL,
	"userId" int DEFAULT null,
	"challenge" json NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"points" int NOT NULL DEFAULT 0,
	"solution" json NOT NULL,
	CONSTRAINT "sudokus_pk" PRIMARY KEY ("sudokuId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"levelId" int NOT NULL DEFAULT '1',
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."solutions" (
	"solutionId" serial NOT NULL,
	"userId" int NOT NULL,
	"sudokuId" int NOT NULL,
	"time" int NOT NULL,
	"points" int NOT NULL,
	"isFinished" BOOLEAN NOT NULL DEFAULT false,
	"lastPlayed" timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "solutions_pk" PRIMARY KEY ("solutionId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."levels" (
	"levelId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"experiencePoints" int NOT NULL,
	CONSTRAINT "levels_pk" PRIMARY KEY ("levelId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "sudokus" ADD CONSTRAINT "sudokus_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("levelId") REFERENCES "levels"("levelId");

ALTER TABLE "solutions" ADD CONSTRAINT "solutions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_fk1" FOREIGN KEY ("sudokuId") REFERENCES "sudokus"("sudokuId");
