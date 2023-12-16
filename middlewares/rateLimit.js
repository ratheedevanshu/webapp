

const { getToken, setToken } = require("../config/redisConfig");

async function RateLimit(key,limit) { 
  const expireTime = 60;
  let counter = await getToken(key);
  if(counter){
        counter = parseInt(counter);
        await setToken(key,counter+1,60);
        if(counter < limit){
            return true;
        }else{
            return false;
        }
    }else{
        await setToken(key,1,60);
        return true;
    }


}

module.exports = { RateLimit };
