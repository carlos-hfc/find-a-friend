import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { InvalidCredentials } from "@/use-cases/errors/invalid-credentials"
import { makeAuthUseCase } from "@/use-cases/factories/make-auth-use-case"

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authUseCase = makeAuthUseCase()

    const { organization } = await authUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply
      .setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .code(200)
      .send()
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.code(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
