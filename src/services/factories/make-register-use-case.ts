import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { UserServices } from "../user-service"

export function makeRegisterUseCase() {
    
        const usersRepository = new PrismaUsersRepository()
        const userService = new UserServices(usersRepository)

        return userService
}