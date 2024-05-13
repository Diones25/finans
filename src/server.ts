import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import chalk from 'chalk';   
import router from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(router);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(chalk.bgGreenBright.black(`Server running: http://localhost:${process.env.PORT}`));
  })
}

const regularServer = http.createServer(app);

if(process.env.NODE_ENV === 'production') {

}
else {
  const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
  runServer(serverPort, regularServer);
}