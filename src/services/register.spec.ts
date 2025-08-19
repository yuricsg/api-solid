import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { expect, test, describe, it} from 'vitest'
import { UserServices } from './user-service'


describe('Register Use Case', () =>{
    it('should hash user password upon registration', async () =>{
        const registerUserCase = new UserServices({

            async findByEmail(email){
                return null
            },

            async create(data) {
                return {
                    id: '1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            },
        })

        const { user } = await registerUserCase.execute({
            name: 'John Doe',
            email: 'johnndoe@example.com',
            password: '123456',
        })

        console.log(user.password_hash)
    
    })
})