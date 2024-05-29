-- CreateTable
CREATE TABLE "Diocese" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "holder" VARCHAR NOT NULL,

    CONSTRAINT "Diocese_pkey" PRIMARY KEY ("id")
);
