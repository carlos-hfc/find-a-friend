import { hash } from "bcryptjs"
import type { FastifyInstance } from "fastify"
import request from "supertest"

import { prisma } from "@/lib/prisma"

export async function createAndAuthOrg(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: "Organização Pets",
      responsible: "John Doe",
      email: "org.pets@email.com",
      passwordHash: await hash("123456", 6),
      cep: "00000-000",
      address: "Rua A, 100",
      district: "Centro",
      complement: null,
      city: "São Paulo",
      uf: "SP",
      whatsapp: "+551199999-9999",
    },
  })

  const authResponse = await request(app.server).post("/login").send({
    email: "org.pets@email.com",
    password: "123456",
  })

  const token = authResponse.get("Set-Cookie") as string[]

  return { token }
}
