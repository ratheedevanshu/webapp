const devConfig = require(`./environments/development`);



module.exports = {
    'development': {
      "secret": devConfig.SECRET,
      "username": devConfig.USERNAME || "root",
      "password": devConfig.PASSWORD || "admin1234",
      "database": devConfig.DB_NAME || "test",
      "host": devConfig.DB_HOST || "localhost",
      "port": devConfig.DB_PORT || 3306,
  
    },
    'staging': {
    //   "staging json"
    
    },
    'production': {
  
    //   "production json"
    }
  };