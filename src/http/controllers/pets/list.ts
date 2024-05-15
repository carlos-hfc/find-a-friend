import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeListPetsUseCase } from "@/use-cases/factories/make-list-pets-use-case"

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    age: z.coerce.number().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    environment: z.string().optional(),
    city: z.string(),
  })

  const query = querySchema.parse(request.query)

  const listPetsUseCase = makeListPetsUseCase()

  const { pets } = await listPetsUseCase.execute(query)

  return reply.code(200).send({ pets })
}
