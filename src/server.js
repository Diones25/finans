import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from 'express';
import path from 'path';
import chalk from 'chalk';   
import router from './routes/routes.js';
import conn from './db/conn.js';
import Spent from './models/Spent.js';
import Category from './models/Category.js';
import Balance from './models/Balance.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'src/views');


app.use(router);

conn
  //.sync({ force: true }) 
  .sync()
  .then(() => {

  app.listen(process.env.PORT, () => {
    console.log(chalk.bgGreenBright.black(`Servidor rodando: http://localhost:${process.env.PORT}`));
  });

}).catch((err) => {
  console.log(chalk.bgRedBright.blackBright(`ERRO: ${err}`));
});