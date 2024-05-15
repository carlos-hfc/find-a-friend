import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ResourceNotFound } from "@/use-cases/errors/resource-not-found"
import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case"

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({
      petId: id,
    })

    return reply.code(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.code(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
