const express  = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongo = require("./connect");
const Users = require('./Router/userRouter')

dotenv.config();
mongo.connect();
app.use(cors());
app.use(express.json());

app.use('/user', Users)

app.listen(6060);