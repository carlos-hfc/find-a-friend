import fastify from "fastify"
import { ZodError } from "zod"

import { env } from "./env"
import { orgsRoutes } from "./http/controllers/organizations/routes"

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: "Validation error.",
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  }

  return reply.code(500).send({
    message: "Internal server error.",
  })
})
