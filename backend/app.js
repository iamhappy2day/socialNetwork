const express = require ('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/socialNetwork";
const cors = require('cors')();
const morgan = require('morgan');
const userRoutes = require('./routes/user-routes')
const authRoutes = require('./routes/auth-routes')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(
    url,
    { useUnifiedTopology: true, 
    useNewUrlParser: true  }
)
.then(() => console.log('We connected to socialNetworkDB'))
.catch(error => console.log(error))

app.use(express.json());
app.use(morgan('dev'));
app.use(cors);
app.use('', authRoutes)
app.use('/users', userRoutes)


const server = app.listen(3000, () => console.log(`Server is running on port ${port} ...`))

//Socket setup
const socket = require('socket.io')
const io = socket(server)

io.on('connection',(socket) => {
    console.log('made socket connection')
})