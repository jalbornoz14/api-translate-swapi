import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      host: process.env.DB_HOST || 'localhost',
      name: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'database',
    },
    app: {
      port: parseInt(process.env.APP_PORT, 10) || 3000,
    },
  };
});
