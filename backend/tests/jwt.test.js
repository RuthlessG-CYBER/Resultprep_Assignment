import jwt from "jsonwebtoken"

test("JWT token should be generated", () => {

  const token = jwt.sign(
    { id: 1, role: "user" },
    "testsecret",
    { expiresIn: "1h" }
  )

  const decoded = jwt.verify(token, "testsecret")

  expect(decoded.id).toBe(1)
})