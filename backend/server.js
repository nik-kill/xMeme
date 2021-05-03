const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// const swaggerUi = require('swagger-ui-express'),
// swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb://localhost/my_database' ;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const memeRouter = require('./routes/memes');
const userRouter = require('./routes/user');

app.use('/memes', memeRouter);
app.use('/', memeRouter);
app.use('/user', userRouter);

// app.use('/memes/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});