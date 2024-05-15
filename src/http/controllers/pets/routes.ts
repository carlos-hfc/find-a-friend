import type { FastifyInstance } from "fastify"

import { verifyJwt } from "@/http/middlewares/verify-jwt"

import { create } from "./create"
import { get } from "./get"
import { list } from "./list"

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create)

  app.get("/pets", list)
  app.get("/pets/:id", get)
}
