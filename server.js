const express = require('express')
const UserRouter = require('./server/api/users/user.router')
const questionRouter = require('./server/api/question/question.route')
const answerRouter = require('./server/api/answer/answer.router')
const pool = require('./server/config/database')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT||80;

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/users', UserRouter);
app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);


app.listen(port,()=>console.log(`listening at http://localhost:${port}`))
