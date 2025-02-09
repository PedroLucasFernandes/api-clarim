import { type UpdateUserDTO, type CreateUserDTO, type LoginUserDTO, LoginResponseDTO, ProfileUserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export interface GetAllUsersUseCase {
    execute: () => Promise<UserEntity[]>;
}

export interface GetUsersUseCase {
    execute: (id: string) => Promise<UserEntity>;
}

export interface GetUsersByUsernameUseCase {
    execute: (username: string) => Promise<UserEntity>;
}

export interface CreateUsersUseCase {
    execute: (data: CreateUserDTO) => Promise<CreateUserDTO>;
}

export interface UpdateUsersUseCase {
    execute: (id: string, data: UpdateUserDTO) => Promise<string>;
}

export interface DeleteUsersUseCase {
    execute: (id: string) => Promise<string>;
}

export interface LoginUsersUseCase {
    execute: (data: LoginUserDTO) => Promise<LoginResponseDTO>;
}

export interface ProfileUsersUseCase {
    execute: (data: string) => Promise<ProfileUserDTO>;
}