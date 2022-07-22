const app = require("./app");
const req = require("supertest");
const mongoose = require("mongoose");
const UserModel = require("./db/models/userModel");
const ProductModel = require("./db/models/productModel");
const OrderModel = require("./db/models/orderModel");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe("Entry point tests", () => {
  test("GET /api/v1", async () => {
    const res = await req(app).get("/api/v1");
    expect(res.status).toBe(200);
    expect(res.body.info).toBeDefined();
  });

  //Public route Tests

  test("GET /api/v1/products", async () => {
    const res = await req(app).get("/api/v1/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/i);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// Authentication and authorization tests

describe("User Tests", () => {
  let tokenUser = "";
  beforeAll(async () => {
    const user = await req(app).post("/api/v1/users/login").send({
      email: "jesttestuser@jest.com",
      password: "password",
    });
    userToken = user.body.token;
  });

  test("email must be valid", async () => {
    const res = await req(app).post("/api/v1/users").send({
      name: "test",
      email: "notanemail",
      password: "password",
      admin: false,
    });
    expect(res.status).toBe(400);
    expect(res.body.email).toBe("Please enter a valid email");
  });

  test("email must be unique", async () => {
    const res = await req(app).post("/api/v1/users").send({
      name: "test",
      email: "jesttestuser@jest.com",
      password: "password",
      admin: false,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  test("Allow user to register", async () => {
    const res = await req(app).post("/api/v1/users").send({
      name: "test",
      email: "jesttest@jest.com",
      password: "password",
      admin: false,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("jesttest@jest.com");
  });

  test("Allow user to login", async () => {
    const res = await req(app).post("/api/v1/users/login").send({
      email: "jesttest@jest.com",
      password: "password",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  test("GET /api//v1/users/me returns logged in user info", async () => {
    const res = await req(app)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email");
  });

  test("put /api//v1/users/ allows user to update their own info", async () => {
    const res = await req(app)
      .put("/api/v1/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "My New Name",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("My New Name");
  });

  test("Protect routes block user not logged in", async () => {
    const res = await req(app).get("/api/v1/orders");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Not authorized, no token");
  });

  test("User can create a stripe checkout session", async () => {
    const res = await req(app)
      .post("/api/v1/checkout/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        items: [
          {
            _id: "62d7705d152bc6afc7db1499",
            quantity: 1,
            name: "Intel Core i5 12600K",
            price: 41900,
          },
        ],
      });
    expect(res.body).toHaveProperty("url");
  });

  test("GET /api/v1/orders/purchase returns a single purchase", async () => {
    const res = await req(app)
      .get("/api/v1/orders/purchase")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toBeInstanceOf(Object);
  });

  test("GET /api/v1/orders/purchase returns array of user purchases", async () => {
    const res = await req(app)
      .get("/api/v1/orders/me")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  afterAll(
    async () => await UserModel.findOneAndDelete({}, { sort: { _id: -1 } })
  );
  afterAll(
    async () =>
      await UserModel.findOneAndUpdate(
        { _id: "62da29007fd39c6aed32ef71" },
        { name: "test" }
      )
  );
});

describe("Admin tests", () => {
  let tokenUser = "";
    let tokenAdmin = "";
    let deleteTestId = ''

  beforeAll(async () => {
    const admin = await req(app).post("/api/v1/users/login").send({
      email: "jesttestadmin@jest.com",
      password: "password",
    });
    const user = await req(app).post("/api/v1/users/login").send({
      email: "jesttestuser@jest.com",
      password: "password",
    });
    const deleteUserTest = await req(app).post("/api/v1/users/").send({
        name: "Delete",
      email: "deleteme@jest.com",
        password: "password",
      admin: false
    });
    adminToken = admin.body.token;
      userToken = user.body.token;
      deleteTestId =  deleteUserTest.body.user._id
  });

  test("Admin only routes block logged in users who are not admin", async () => {
    const res = await req(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Not authorized");
  });

  test("Admin only routes allow admin to access", async () => {
    const res = await req(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET /api/v1/users allows user to access all user info", async () => {
    const res = await req(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(3);
  });

  test("put /api//v1/users/ allows admin to update any user's info", async () => {
    const res = await req(app)
      .put("/api/v1/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "My New Name",
        _id: "62da29007fd39c6aed32ef71",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("My New Name");
  });

  test("When creating a product the name must be unique", async () => {
    const res = await req(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "AMD Ryzen 5 5600X",
        description: "Test",
        price: 100000,
        type: "Motherboard",
        quantity: 5,
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Product already exists");
  });

  test("Admin can update product properties", async () => {
    const res = await req(app)
      .put("/api/v1/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        _id: "62d8278037c0d0640d8fea8e",
        name: "changed name test",
      });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("changed name test");
  });

  test("Admin can delete a user", async () => {
    const res = await req(app)
      .delete("/api/v1/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        _id: deleteTestId,
      });
  });

  afterAll(
    async () =>
      await ProductModel.findOneAndUpdate(
        { _id: "62d8278037c0d0640d8fea8e" },
        { name: "Asrock Z590 OC Formula" }
      )
  );

  afterAll(
    async () =>
      await UserModel.findOneAndUpdate(
        { _id: "62da29007fd39c6aed32ef71" },
        { name: "test" }
      )
  );
});
