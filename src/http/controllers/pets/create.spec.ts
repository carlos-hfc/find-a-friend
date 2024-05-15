import request from "supertest"
import { makePet } from "test/factories/make-pet"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { app } from "@/app"
import { createAndAuthOrg } from "@/utils/test/create-and-auth-org"

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to register a pet", async () => {
    const { token } = await createAndAuthOrg(app)

    const response = await request(app.server)
      .post("/pets")
      .set("Cookie", token)
      .send(makePet())

    expect(response.statusCode).toEqual(201)
  })
})
