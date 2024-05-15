import request from "supertest"
import { makeOrg } from "test/factories/make-org"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { app } from "@/app"

describe("Create Organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to create an organization", async () => {
    const response = await request(app.server).post("/orgs").send(makeOrg())

    expect(response.statusCode).toEqual(201)
  })

  it("should not be able to create an organization with same e-mail", async () => {
    const body = makeOrg()

    await request(app.server).post("/orgs").send(body)
    const response = await request(app.server).post("/orgs").send(body)

    expect(response.statusCode).toEqual(409)
  })
})
