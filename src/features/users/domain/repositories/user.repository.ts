import { CreateUserDTO, UpdateUserDTO, LoginUserDTO, LoginResponseDTO, ProfileUserDTO } from "../dto/user.dto";
import { type UserEntity } from "../entities/user.entity"; 

export abstract class UserRepository {
    abstract getAll(): Promise<UserEntity[]>;
    abstract get(id: string): Promise<UserEntity>;
    abstract getByUsername(username: string): Promise<UserEntity>;
    abstract create(data: CreateUserDTO): Promise<CreateUserDTO>;
    abstract update(id: string, data: UpdateUserDTO): Promise<string>;
    abstract delete(id: string): Promise<string>;
    abstract login(data: Record<string, any>): Promise<LoginResponseDTO>;
    abstract profile(data: string): Promise<ProfileUserDTO>;
}