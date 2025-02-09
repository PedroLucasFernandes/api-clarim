import { type UserRepository } from "../repositories/user.repository";
import { type DeleteUsersUseCase } from "./user.usecase";

export class DeleteUsers implements DeleteUsersUseCase {
    constructor(private readonly repository: UserRepository) {}
    async execute(id: string): Promise<string> {
        return this.repository.delete(id);
    };
}