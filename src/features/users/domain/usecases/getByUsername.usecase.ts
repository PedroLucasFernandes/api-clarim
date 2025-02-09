import { UserEntity } from "../entities/user.entity";
import { type UserRepository } from "../repositories/user.repository";
import { type GetUsersByUsernameUseCase } from "./user.usecase";

export class GetByUsername implements GetUsersByUsernameUseCase {
    constructor(private readonly repository: UserRepository) {}
    async execute(username: string): Promise<UserEntity> {
        return this.repository.getByUsername(username);
    };
}