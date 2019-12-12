"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors')();
const morgan = require('morgan');
const app = express_1.default();
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
app.use(express_1.default.json());
dotenv_1.default.config();
app.use(morgan('dev'));
app.use(cors);
app.use('', authRoutes);
app.use('/users', userRoutes);
mongoose_1.default.connect(process.env.DB_CONNECT, { useUnifiedTopology: true,
    useNewUrlParser: true })
    .then(() => console.log('We connected to socialNetworkDB'))
    .catch((error) => console.log(error));
const server = app.listen(process.env.PORT, () => {
    console.log("Server is running...");
});
//Socket setup
const socket = require('socket.io');
const io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection');
    //joining to the dialog
    socket.on('join', (data) => {
        socket.join(data);
        console.log(data + ' joined the room');
    });
});
