import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { expect, test, describe, it, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { AuthenticationUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'


let userRepository: InMemoryUsersRepository;
let sut: AuthenticationUseCase;

describe("Authenticate Use case", () =>{
    beforeEach(() => {
            userRepository = new InMemoryUsersRepository()
            sut = new AuthenticationUseCase(userRepository)
        })


    it("Should not be able to authenticate with wrong email", async () =>{

        expect(()=>
            sut.execute({
            email: 'johndoe@example.com',
            password:'123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })


    it("Should not be able to authenticate with wrong password", async () =>{

        expect(()=>
            sut.execute({
            email: 'johndoe@example.com',
            password:'123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})