import request from "supertest"
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
    const response = await request(app.server).post("/orgs").send({
      name: "Organização Pets",
      responsible: "John Doe",
      email: "org.pets@email.com",
      password: "123456",
      cep: "00000-000",
      address: "Rua A, 100",
      district: "Centro",
      complement: null,
      city: "São Paulo",
      uf: "SP",
      whatsapp: "+551199999-9999",
    })

    expect(response.statusCode).toEqual(201)
  })

  it("should not be able to create an organization with same e-mail", async () => {
    const body = {
      name: "Organização Pets",
      responsible: "John Doe",
      email: "org.pets@email.com",
      password: "123456",
      cep: "00000-000",
      address: "Rua A, 100",
      district: "Centro",
      complement: null,
      city: "São Paulo",
      uf: "SP",
      whatsapp: "+551199999-9999",
    }

    await request(app.server).post("/orgs").send(body)
    const response = await request(app.server).post("/orgs").send(body)

    expect(response.statusCode).toEqual(409)
  })
})
