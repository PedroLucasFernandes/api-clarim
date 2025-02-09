import { type ProfileUserDTO } from "../dto/user.dto";
import { type UserRepository } from "../repositories/user.repository";
import { type ProfileUsersUseCase } from "./user.usecase";
import jwt, { JwtPayload } from "jsonwebtoken";


export class ProfileUsers implements ProfileUsersUseCase {
    constructor(private readonly repository: UserRepository) {}

    extractTokenAndVerify(data: string): string {
        if(!data) { throw new Error("Token Error."); }
        
        const token = data.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
        
        return id; 
    } 

    async execute(data: string): Promise<ProfileUserDTO> {
        let idData = this.extractTokenAndVerify(data);
        return this.repository.profile(idData);
    };
}