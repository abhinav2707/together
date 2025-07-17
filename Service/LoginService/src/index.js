require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const connectDB = require('./config/connectDB.js');
// const routes = require ('./routes');
// const errorMiddleware = req('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
// app.use(errorMiddleware);

connectDB();


// app.use('api' , routes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});