module.exports = {
PORT: (process.env.PORT || 3001),
SECRET: (process.env.SECRET || "yo"),
JWT_EXPIRATION: (process.env.JWT_EXPIRATION || 86400),
USERNAME: (process.env.USERNAME || 'root'),
PASSWORD: (process.env.PASSWORD || "admin1234"),
DB_NAME: (process.env.DB_NAME || 'test'),
DB_HOST: (process.env.DB_HOST || 'localhost'),
DB_PORT: (process.env.DB_PORT || 3306),
REDIS_HOST:(process.env.REDIS_HOST || 'localhost'),
};