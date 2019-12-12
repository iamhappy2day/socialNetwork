import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app: Application = express();

const userRoutes = require('./routes/user-routes')


app.use(express.json());
app.use('/', userRoutes)
dotenv.config();

declare const process : {
    env: {
        DB_CONNECT: string,
        PORT: number
    }
};

mongoose.connect(
    process.env.DB_CONNECT ,
    { useUnifiedTopology: true,
        useNewUrlParser: true  }
)
    .then(() => console.log('We connected to socialNetworkDB'))
    .catch((error: any) => console.log(error))

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running...")
});
