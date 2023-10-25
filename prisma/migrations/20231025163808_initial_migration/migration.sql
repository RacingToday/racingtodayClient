-- CreateTable
CREATE TABLE "up_users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" TEXT,
    "password" TEXT NOT NULL,
    "resetPasswordToken" TEXT,
    "confirmationToken" TEXT,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "roleId" INTEGER,

    CONSTRAINT "up_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "race_day" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "race_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_race_dayToup_users" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "up_users_username_key" ON "up_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "up_users_email_key" ON "up_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_race_dayToup_users_AB_unique" ON "_race_dayToup_users"("A", "B");

-- CreateIndex
CREATE INDEX "_race_dayToup_users_B_index" ON "_race_dayToup_users"("B");

-- AddForeignKey
ALTER TABLE "up_users" ADD CONSTRAINT "up_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_race_dayToup_users" ADD CONSTRAINT "_race_dayToup_users_A_fkey" FOREIGN KEY ("A") REFERENCES "race_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_race_dayToup_users" ADD CONSTRAINT "_race_dayToup_users_B_fkey" FOREIGN KEY ("B") REFERENCES "up_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
