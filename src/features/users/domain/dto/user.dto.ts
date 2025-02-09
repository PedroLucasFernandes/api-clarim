import { UserType } from "@prisma/client";
import { type UserEntity } from "../entities/user.entity";

export interface CreateUserDTO {
    name: string;
    login: string;
    description: string;
    image: string;
    password: string;
    type?: UserType;
}

export interface UpdateUserDTO {
    name?: string;
    login?: string;
    description?: string;
    image?: string;
    password?: string;
    type?: UserType;
    isActive?: boolean;
}

export interface LoginUserDTO {
    login: string;
    password: string;
    token?: string;
}

// TODO: Add posts into it.
export interface ProfileUserDTO {
    id: string
    name: string,
    login: string,
    description: string,
    image: string,
    type: UserType,
}

export interface LoginResponseDTO {
    user: ProfileUserDTO,
    token: string,
}