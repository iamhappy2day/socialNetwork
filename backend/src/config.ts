import dotenv from 'dotenv';
dotenv.config();

declare const process : {
    env: {
        DB_CONNECT: string,
        PORT: number,
        TOKEN_SECRET: string
    }
};

export const config = {
    PORT: process.env.PORT || 3000,
    DB_CONNECT: process.env.DB_CONNECT,
    TOKEN_SECRET: process.env.TOKEN_SECRET
};
