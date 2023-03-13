const express = require('express');
require('dotenv').config();

/* console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PWD);
console.log(process.env.DB_HOST); */
const app = express();
const bodyParser = require('body-parser');
global.__basedir = __dirname + "/";
console.log(__basedir);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const seDb = require("./config/database/db");
// console.log(seDb);
    seDb.sequelize.sync({ alter: true })
        .then(()=>{
            console.log('DB synced');
        }).catch((err)=>{
            console.log('Could not synced DB'+err.message);
        });

    const {verifyToken} = require("./middleware/authJwt");

    const bookRouter = require('./routes/bookRoutes');
    const userRouter = require('./routes/userRoutes');
    const authRouter = require('./routes/authRoutes');

    app.use('/api/v1/books',[verifyToken],bookRouter);
    app.use('/api/v1/users',[verifyToken],userRouter);
    app.use('/api/v1/auth',authRouter);


    
module.exports = app;