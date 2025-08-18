import { prisma } from "@/lib/prisma ";
import { Prisma } from "@/generated/prisma";
import { UsersRepositoryInterface } from "../users-repository";

export class PrismaUsersRepository implements UsersRepositoryInterface{
    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where:{
                email,
            },
        })
        return user
    }
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
        data,
    })
    return user
    }
}