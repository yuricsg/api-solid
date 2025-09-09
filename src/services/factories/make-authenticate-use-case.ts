import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { AuthenticationUseCase } from "../authenticate"

export function makeAuthenticateUseCase(){

    const usersRepository = new PrismaUsersRepository()
    const authenticationUseCase = new AuthenticationUseCase(usersRepository)

    return authenticationUseCase
}