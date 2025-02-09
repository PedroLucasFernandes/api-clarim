import { type UserEntity } from "../entities/user.entity";
import { type UserRepository } from "../repositories/user.repository";
import { GetAllUsersUseCase } from "./user.usecase";

export class GetAllUsers implements GetAllUsersUseCase {
    constructor(private readonly repository: UserRepository) {}

    async execute(): Promise<UserEntity[]> {
        return this.repository.getAll();
    };
}