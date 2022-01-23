const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.routes");


const db = require('./models');
db.sequelize.sync();

dotenv.config();
const PORT = process.env.PORT
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type");
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS");
  next();
  });
app.use('/users',userRouter);
app.use('/',authRouter);
app.listen(PORT, () => {
    console.log(`Сервер начал прослушивание запросов на порту http://localhost:${PORT}`)
})