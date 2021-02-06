const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://firstMern:dbPassword@cluster0.qbwrs.mongodb.net/xMeme?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const memeRouter = require('./routes/memes');

app.use('/memes', memeRouter);
app.use('/', memeRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});