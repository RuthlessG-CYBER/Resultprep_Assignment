import bcrypt from "bcrypt"

test("Password should be hashed", async () => {

  const password = "123456"

  const hash = await bcrypt.hash(password, 10)

  const match = await bcrypt.compare(password, hash)

  expect(match).toBe(true)

})