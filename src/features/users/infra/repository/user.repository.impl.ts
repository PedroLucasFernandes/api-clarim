import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { CreateUserDTO, LoginResponseDTO, ProfileUserDTO, UpdateUserDTO } from "../../domain/dto/user.dto";

export class UserRepositoryImpl extends UserRepository {
    constructor(
        private readonly service: PrismaClient
    ) { super(); }

    async create(data: CreateUserDTO): Promise<CreateUserDTO> {
        let newUser = await this.service.user.create({
            data
        });

        return newUser;
    }

    async get(id: string): Promise<UserEntity> {
        let user = await this.service.user.findFirst({
            where: {
                id, AND: {
                    isActive: true
                }
            },
            include: {
                createdPost: true,
                updatedPost: true
            }
        });

        return user!!;
    }

    async getAll(): Promise<UserEntity[]> {
        let users = await this.service.user.findMany({
            where: {
                isActive: true,
            },
            include: {
                createdPost: true,
                updatedPost: true,
            }
        });

        return users!!;
    }

    async getByUsername(username: string): Promise<UserEntity> {
        let user = await this.service.user.findFirst({
            where: { login: username, isActive: true },
            include: {
                createdPost: true,
                updatedPost: true,
            }
        });

        return user!!;
    }

    async update(id: string, data: UpdateUserDTO): Promise<string> {
        await this.service.user.update({
            where: { id, isActive: true },
            data
        });

        let newUser = await this.get(id);

        return `Usuário \"${newUser.name}\" atualizado`;
    }

    async delete(id: string): Promise<string> {
        await this.service.user.update({
            where: { id },
            data: { isActive: false }
        });

        return "Usuário desativado";
    }

    async login(data: Record<string, any>): Promise<LoginResponseDTO> {
        let user = data["user"];
        const newData = {
            id: user.id,
            name: user.name,
            login: user.login,
            description: user.description,
            image: user.image,
            type: user.type
        };
        
        const loginUser = {
            user: newData,
            token: data["token"]
        };
        return loginUser;
    }

    /**
     * 
     * @param data Id from jwt.verify coming from profile usecase
     * @returns Common profile DTO
     */
    async profile(data: string): Promise<ProfileUserDTO> {
        const user = await this.get(data);

        if(!user) { 
            throw new Error("O usuário em questão não existe e/ou foi desativado."); 
        }
        return { 
            id: user.id,
            name: user.name,
            login: user.login,
            description: user.description,
            image: user.image,
            type: user.type,
        }
    }
}