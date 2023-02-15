export default () => ({
  env: process.env.NODE_ENV || 'development',
  redis: {
    url:
      process.env.REDIS_URL ||
      'redis-11977.c278.us-east-1-4.ec2.cloud.redislabs.com:11977',
    password: process.env.PASSWORD || '8A6nxHcBCFyhkzgXkSnVNurS9WNoViol',
    ttl: process.env.REDIS_TTL || 60 * 60 * 24 * 7, // 7 day
  },
  jwtAuth: {
    access_token_ttl: process.env.JWT_ACCESS_TTL || '1d',
    refresh_token_ttl: process.env.JWT_REFRESH_TTL || '7d',
    jwt_token_secret: process.env.JWT_TOKEN_SECRET || 'dsfdgsfdhgmjhfgdbsds',
  },
  google: {
    google_client_id:
      process.env.GOOGLE_CLIENT_ID ||
      '389621928405-ao853t6nab799a3q2hjcletg291k22o9.apps.googleusercontent.com',
    google_secret:
      process.env.GOOGLE_SECRET || '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',
  },
  database: {
    mysql: {
      type: 'mysql',
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '123456',
      database: process.env.MYSQL_DATABASE_NAME || 'pet-shop',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      logging: !!process.env.MYSQL_LOGGING || true,
    },
  },
  port: Number(process.env.PORT) || 3000,
});
