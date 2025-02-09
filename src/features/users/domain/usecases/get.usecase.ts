import { type UserEntity } from "../entities/user.entity";
import { type UserRepository } from "../repositories/user.repository";
import { GetUsersUseCase } from "./user.usecase";

export class GetUsers implements GetUsersUseCase {
    constructor(private readonly repository: UserRepository) {}

    async execute(id: string): Promise<UserEntity> {
        return this.repository.get(id);
    };
}