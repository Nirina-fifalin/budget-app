-- CreateTable
CREATE TABLE "MonthSummary" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "income" INTEGER NOT NULL,
    "expense" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "carryOver" INTEGER NOT NULL,

    CONSTRAINT "MonthSummary_pkey" PRIMARY KEY ("id")
);
