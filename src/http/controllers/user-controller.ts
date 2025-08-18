import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma '
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { UserServices } from '@/services/user-service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try{
        const usersRepository = new PrismaUsersRepository()
        const userService = new UserServices(usersRepository)

        await userService.execute({
            name,
            email,
            password
        })
    }catch (err){
        console.error(err)
        return reply.status(500).send({ error: (err as Error).message })
    }

    
    return reply.status(201).send()
}
