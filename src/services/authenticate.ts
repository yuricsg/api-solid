import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@/generated/prisma";

interface AuthenticationUseCaseRequest{
    email: string
    password: string
}  

interface AuthenticationUseCaseResponse {
    user: User
}


export class AuthenticationUseCase{
    constructor(private userRepository: UsersRepositoryInterface,){}

    async execute({ 
        email,
        password 
    }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
         const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }

    }
}