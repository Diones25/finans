import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import chalk from 'chalk';   
import router from './routes/routes';
import { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

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