import { prisma } from "@/lib/prisma "
import { UsersRepositoryInterface } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { create } from "domain"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@/generated/prisma"

interface UserService{
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse{
    user: User,
}

export class UserServices{

    constructor(private usersRepository: UsersRepositoryInterface){}

    async execute({
    name,
    email,
    password
}: UserService): Promise <RegisterUseCaseResponse>{
    const password_hash = await hash(password, 2)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if(userWithSameEmail){
        throw new UserAlreadyExistsError()
    }

    
    //const usersRepository = new UsersRepository()

    const user = await this.usersRepository.create({
        name,
        email,
        password_hash
    })

    return{
        user,
    } 
 }
}