import { type UpdateUserDTO } from "../dto/user.dto";
import { type UserRepository } from "../repositories/user.repository";
import { type UpdateUsersUseCase } from "./user.usecase";
import bcrypt from "bcrypt";

export class UpdateUsers implements UpdateUsersUseCase {
    constructor(private readonly repository: UserRepository) {}
    async encrypt(passwd?: string): Promise<string | undefined> {
        if(passwd) {
            let encryptedPasswd = bcrypt.hash(passwd, 10);

            return encryptedPasswd;
        }

        return undefined;
    }

    async execute(id: string, data: UpdateUserDTO): Promise<string> {
        data.password = await this.encrypt(data.password);    
        return this.repository.update(id, data);
    };
}