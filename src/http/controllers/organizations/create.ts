import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { OrganizationAlreadyExists } from "@/use-cases/errors/organization-already-exists"
import { makeCreateOrganizationUseCase } from "@/use-cases/factories/make-create-organization-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    responsible: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    district: z.string(),
    complement: z.string().nullable(),
    city: z.string(),
    uf: z.string().min(2).max(2),
    whatsapp: z.string(),
  })

  const {
    name,
    responsible,
    email,
    password,
    cep,
    address,
    district,
    complement,
    city,
    uf,
    whatsapp,
  } = bodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateOrganizationUseCase()

    await createUseCase.execute({
      name,
      responsible,
      email,
      password,
      cep,
      address,
      district,
      complement,
      city,
      uf,
      whatsapp,
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExists) {
      return reply.code(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.code(201).send()
}
