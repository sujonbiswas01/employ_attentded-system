/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `positions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "positions_title_key" ON "positions"("title");
