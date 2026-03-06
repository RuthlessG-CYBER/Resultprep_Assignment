import request from "supertest"
import express from "express"
import router from "../src/routes/route.js"


const app = express()

app.use(express.json())
app.use("/api", router)

describe("Auth API", () => {

  test("Register user", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        email: "testuser@gmail.com",
        password: "123456"
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("message")
  })

  test("Login user", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "testuser@gmail.com",
        password: "123456"
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("token")
  })

})