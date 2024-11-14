const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
  userModel: require(`${pathModels}/user`),
  trackModel: require(`${pathModels}/track`),
  storageModel: require(`${pathModels}/storage`),
};

module.exports = models;
