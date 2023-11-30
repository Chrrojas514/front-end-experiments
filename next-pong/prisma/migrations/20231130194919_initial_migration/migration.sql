-- CreateTable
CREATE TABLE `GameState` (
    `roomId` VARCHAR(191) NOT NULL,
    `roomName` VARCHAR(255) NOT NULL,
    `playerA` VARCHAR(20) NOT NULL,
    `playerB` VARCHAR(20) NOT NULL,
    `playerAPaddlePosition` INTEGER NOT NULL,
    `playerBPaddlePosition` INTEGER NOT NULL,
    `playerAScore` INTEGER NOT NULL,
    `playerBScore` INTEGER NOT NULL,
    `ballPositionX` INTEGER NOT NULL,
    `ballPositionY` INTEGER NOT NULL,
    `ballVelocityX` INTEGER NOT NULL,
    `ballVelocityY` INTEGER NOT NULL,
    `gameStarted` BOOLEAN NOT NULL,
    `gameOver` BOOLEAN NOT NULL,

    PRIMARY KEY (`roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
