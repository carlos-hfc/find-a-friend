import type { FastifyInstance } from "fastify"

import { auth } from "./auth"
import { create } from "./create"

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create)

  app.post("/login", auth)
}
