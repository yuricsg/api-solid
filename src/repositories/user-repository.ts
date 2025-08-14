import { prisma } from "@/lib/prisma ";
import { Prisma } from "@/generated/prisma";

export class UsersRepository{
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
        data,
    })
    return user
    }
}