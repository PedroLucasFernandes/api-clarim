import { CreateUserDTO } from "../dto/user.dto";
import { type UserRepository } from "../repositories/user.repository";
import { CreateUsersUseCase } from "./user.usecase";
import bcrypt from "bcrypt";

export class CreateUsers implements CreateUsersUseCase {
    constructor(private readonly repository: UserRepository) {}

    async encrypt(passwd: string): Promise<string> {
        let encryptedPasswd = await bcrypt.hash(passwd, 10);
        return encryptedPasswd;
    }
    
    async execute(data: CreateUserDTO): Promise<CreateUserDTO> {
        data.password = await this.encrypt(data.password);
        return this.repository.create(data);
    };
}
