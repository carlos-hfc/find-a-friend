import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ResourceNotFound } from "@/use-cases/errors/resource-not-found"
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.number().int(),
    size: z.string(),
    energy: z.string(),
    environment: z.string(),
    requirements: z.string(),
  })

  const data = bodySchema.parse(request.body)

  try {
    const createUseCase = makeCreatePetUseCase()

    await createUseCase.execute({
      ...data,
      organizationId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.code(404).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.code(201).send()
}
