const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const { testAuthRegister } = require("./helper/helperData")
const { userModel } = require("../models");
const { storageModel } = require("../models");
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;


beforeAll(async () => {
    await userModel.deleteMany({});
    await storageModel.deleteMany({});
    const user = userModel.create(testAuthRegister);
    JWT_TOKEN = await tokenSign(user);
});


test("Should uplaod file", async () => {
    const res = await request(app)
      .post("/api/storages")
      .set("Authorization", `Bearer ${JWT_TOKEN}`)
      .attach("myfile", filePath);

    const { body } = res;

    expect(res.statusCode).toEqual(201);
    expect(body).toHaveProperty("data");
    expect(body).toHaveProperty("data.url");
  });

test("Should create a return all", async () => {
    const response = await request(app)
      .get("/api/storages")
      .set("Authorization", `Bearer ${JWT_TOKEN}`);

    const { body } = response;

    expect(response.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");
});


test("Must return all the details of the item", async () => {
    const { _id } = await storageModel.findOne();
    id = _id.toString();
  
    const res = await request(app)
      .get(`/api/storages/${id}`)
      .set("Authorization", `Bearer ${JWT_TOKEN}`);

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");
});

test("Must delete the item", async () => {
    const { _id } = await storageModel.findOne();
    id = _id.toString();
  
    const res = await request(app)
      .delete(`/api/storages/${id}`)
      .set("Authorization", `Bearer ${JWT_TOKEN}`);

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("filePath");
    expect(body).toHaveProperty("deleted", 1);
});

