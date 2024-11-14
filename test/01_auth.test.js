const request = require("supertest");
const app = require("../app");
const { userModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");


beforeAll(async () => {
    await userModel.deleteMany({});
});
  
test("This should return 404", async () => {
    const response = await request(app)
      .post("/api/auths/login")
      .send(testAuthLogin);
  
    expect(response.statusCode).toEqual(404);
});
  
test("This should return 201", async () => {
    const response = await request(app)
      .post("/api/auths/register")
      .send(testAuthRegister);
  
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
});


test("This should return invalid password 401", async () => {
    const newTestAuthLogin = {...testAuthLogin, password: "22222222"}
    const response = await request(app)
      .post("/api/auths/login")
      .send(newTestAuthLogin);
  
    expect(response.statusCode).toEqual(401);
});

test("This should return 200 successful login", async () => {
    const response = await request(app)
      .post("/api/auths/login")
      .send(testAuthRegister);
  
    expect(response.statusCode).toEqual(200);
});
