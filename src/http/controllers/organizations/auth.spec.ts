import request from "supertest"
import { makeOrg } from "test/factories/make-org"
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"

import { app } from "@/app"

describe("Auth (e2e)", () => {
  beforeEach(async () => {
    await request(app.server).post("/orgs").send(makeOrg())
  })

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to authenticate", async () => {
    const response = await request(app.server).post("/login").send({
      email: "org.pets@email.com",
      password: "123456",
    })

    expect(response.statusCode).toEqual(200)
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("token="),
    ])
  })

  it("should not be able to authenticate with wrong e-mail", async () => {
    const response = await request(app.server).post("/login").send({
      email: "email@email.com",
      password: "123456",
    })

    expect(response.statusCode).toEqual(400)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const response = await request(app.server).post("/login").send({
      email: "org.pets@email.com",
      password: "123",
    })

    expect(response.statusCode).toEqual(400)
  })
})
