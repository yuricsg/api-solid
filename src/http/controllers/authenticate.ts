import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticationUseCase } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try{
        
        const authenticationUseCase = makeAuthenticateUseCase()

        await authenticationUseCase.execute({
            email,
            password
        })
    }catch (err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({message: err.message})
        }else{
            //TODO: Aqui deveria possuir alguma ferramenta externa como: DataDog/ NewRelic/ Sentry...
        }
        console.error(err)
        return reply.status(500).send({ error: (err as Error).message })
    }

    
    return reply.status(200).send()
}
