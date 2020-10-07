const {
  APP_NAME = 'nodejs-boilerplate-ms',
  APP_ENV = 'local',
  PORT = 5000,
  AUTH_HEADER = 'x-auth-secret',
  AUTH_SECRET = 'secret',
  REST_TIMEOUT = 2000,
  MONGO_URI = 'mongodb://127.0.0.1:27017',
  MONGO_DATABASE = '',
  MONGO_TIMEOUT = 2000
} = process.env;

const config = {
  app_name: APP_NAME,
  env: APP_ENV,
  port: PORT,
  auth: {
    header: AUTH_HEADER,
    secret: AUTH_SECRET
  },
  rest: {
    // @ts-ignore
    timeout: Number.parseInt(REST_TIMEOUT, 10)
  },
  mongo: {
    uri: MONGO_URI,
    database: MONGO_DATABASE,
    timeout: MONGO_TIMEOUT
  },
};

export default config;
