module.exports = {
	   "NEO4j_DRIVER": process.env.NEO4j_DRIVER || "bolt://localhost",
       "MONGO_URL": process.env.MONGO_URL || "mongodb://localhost/test",
       "REDIS_HOSTNAME": process.env. REDIS_HOSTNAME || "localhost",
       "REDIS_PORT": process.env. REDIS_PORT || 6379,
       "EXPRESS_PORT": process.env.EXPRESS_PORT || 8081
}