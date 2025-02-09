import { UserRepository } from "../repositories/user.repository";
import { type LoginResponseDTO, type LoginUserDTO } from "../dto/user.dto";
import { type LoginUsersUseCase } from "./user.usecase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginUsers implements LoginUsersUseCase {
    constructor(private readonly repository: UserRepository) {} 

    async verifyPasswd(dbPasswd: string, passwd: string): Promise<boolean> {
        let verifyPasswd = await bcrypt.compare(passwd, dbPasswd);
        return verifyPasswd;
    }

    async verifyUsername(data: LoginUserDTO): Promise<Record<string, any>> {
        let user = await this.repository.getByUsername(data.login);
        if(!user) {
            throw new Error("User not found!");
        }
        if(!(await this.verifyPasswd(user.password, data.password))) {
            throw new Error("Passwd error!");
        }
        if(user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", { expiresIn: "1d" });
            return {
                user,
                token
            }
        }
        return {};
    }

    async execute(data: LoginUserDTO): Promise<LoginResponseDTO> {
        let responseJson = await this.verifyUsername(data);
        if((Object.keys(responseJson).length == 0)) {
            // IMPLEMENT: create a custom error handler with status and error code.
            throw new Error("Login error!");
        }
        return this.repository.login(responseJson);
    };
}