export default () => ({
  port: parseInt(process.env.PORT || '3000'),
  jwt_secret: process.env.JWT_SECRET,
  dbHost: process.env.DB_HOST,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
  nodeEnv: process.env.NODE_ENV,
});
