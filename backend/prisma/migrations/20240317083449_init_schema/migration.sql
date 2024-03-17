-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "numberVotes" INTEGER NOT NULL,
    "linkWebsite" TEXT NOT NULL,
    "codeName" TEXT NOT NULL,
    "punchline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moreInfo" TEXT,
    "logoFile" TEXT NOT NULL,
    "typeOfProduct" TEXT NOT NULL,
    "productCategory" TEXT NOT NULL,
    "typeCommercialOffer" TEXT NOT NULL,
    "tags" TEXT[],
    "launchDate" TIMESTAMP(3) NOT NULL,
    "productDevelopmentStage" TEXT NOT NULL,
    "finalNotes" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "roasted" BOOLEAN NOT NULL DEFAULT false,
    "ideaRating" INTEGER NOT NULL,
    "productRating" INTEGER,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
