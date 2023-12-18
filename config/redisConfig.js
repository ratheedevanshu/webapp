const redis = require('redis');
const path = require('path');
const config = require('../config');
const redisHost = config.REDIS_HOST;

const redisClient = redis.createClient({
  host: redisHost,
  port :  6379
});


redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

async function getToken(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, result) => {
      if (err) {
        console.error('Error checking token in Redis:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function setToken(key,e,time) {
	try {
		redisClient.set(key,e, 'EX', time, async (err) => {
            if (err) {
                console.error('Error storing token in Redis:', err);
            }
            else {
              console.log("has set successfully");
            }
        })
	} catch (e) {
		console.log(e);
	}
}

function clearRedisCache(key) {
  setTimeout(() => {
      redisClient.del(key, (err, count) => {
      if (err) {
        console.error('Error clearing Redis cache:', err);
        return;
      }
      if (count > 0) {
        console.log('Redis cache cleared for key:', key);
      } else {
        console.log('Key not found in Redis cache:', key);
      }
    });
  }, (10000)); 
}

module.exports = {
  getToken,
	setToken,
  clearRedisCache,
};