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

    const bookRouter = require('./routes/bookRoutes');
    app.use('/api/v1/books',bookRouter);
module.exports = app;