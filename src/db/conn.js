import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import { Sequelize } from'sequelize';
import chalk from'chalk';

const sequelize = new Sequelize(process.env.DN_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

try {
  sequelize.authenticate();
  console.log(chalk.bgGreenBright.blackBright('Conectado com sucesso!'));
} catch (error) {
  console.log(chalk.bgRedBright.black(`Não foi possível conectar: ${error}`));
}

export default sequelize;