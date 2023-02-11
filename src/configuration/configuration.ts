export default () => ({
  env: process.env.NODE_ENV || 'development',
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379/',
    ttl: process.env.REDIS_TTL || 60 * 60 * 24 * 7, // 7 day
  },
  jwtAuth: {
    access_token_ttl: process.env.JWT_ACCESS_TTL || '1d',
    refresh_token_ttl: process.env.JWT_REFRESH_TTL || '7d',
    jwt_token_secret: process.env.JWT_TOKEN_SECRET || 'dsfdgsfdhgmjhfgdbsds',
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
});