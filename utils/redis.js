const Redis = require("redis");
const redisClient = Redis.createClient();
const DEFAULT = 3600;
redisClient.connect();



const setRedis = (key,value) =>{
  redisClient.setEx(key,DEFAULT,JSON.stringify(value))
}

const getRedisData =async (key) =>{
  const data=await redisClient.get(key)
  let info
  if(data){
    info = JSON.parse(data)
    return info
  }
}

//const setOrGetCache = (key,cb) =>{
//    return new Promise((resolve,reject)=>{
//        redisClient.get(key,async(error,data)=>{
//            if(error){
//                return reject (error)
//            };
//            if(data != null) {
//                return resolve(JSON.parse(data))
//            }
//            const freshdata = await cb();
//            redisClient.setEx(key,DEFAULT,JSON.stringify(freshdata));
//            resolve(freshdata)
//        })
//    })
//}


module.exports={
    setRedis,
    getRedisData,
    redisClient,
   // setOrGetCache
}