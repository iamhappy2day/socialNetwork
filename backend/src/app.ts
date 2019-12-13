import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {userRouter} from './routes/user-routes';
import {authRouter} from './routes/auth-routes';
const cors = require('cors')();
const morgan = require('morgan');
const app: Application = express();

app.use(express.json());

dotenv.config();
app.use(morgan('dev'));
app.use(cors);
app.use('', authRouter);
app.use('/users', userRouter);

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

//Socket setup
const socket = require('socket.io');
const io = socket(server);

io.on('connection',(socket: any) => {
    console.log('made socket connection');
    //joining to the dialog
    socket.on('join', (data: any) => {
        socket.join(data);
        console.log( data + ' joined the room')
    });

});
