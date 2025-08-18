import { prisma } from "@/lib/prisma "
import { UsersRepositoryInterface } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { create } from "domain"

interface UserService{
    name: string
    email: string
    password: string
}

export class UserServices{

    constructor(private usersRepository: UsersRepositoryInterface){}

    async execute({
    name,
    email,
    password
}: UserService){
    const password_hash = await hash(password, 2)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if(userWithSameEmail){
        throw new Error('E-mail already exists')
    }

    
    //const usersRepository = new UsersRepository()

    await this.usersRepository.create({
        name,
        email,
        password_hash
    })
 }
}