import { prisma } from "@/lib/prisma "
import { hash } from "bcryptjs"
import { UsersRepository } from "@/repositories/user-repository"
import { create } from "domain"

interface UserService{
    name: string
    email: string
    password: string
}

export async function userService({
    name,
    email,
    password
}: UserService){
    const password_hash = await hash(password, 2)

    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email,
        },
    })

    if(userWithSameEmail){
        throw new Error('E-mail already exists')
    }

    
    const usersRepository = new UsersRepository()

    usersRepository.create({
        name,
        email,
        password_hash
    })
}