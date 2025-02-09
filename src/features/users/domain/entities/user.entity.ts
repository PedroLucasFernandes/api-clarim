import { Post, UserType } from "@prisma/client";

export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public login: string,
        public password: string,
        public image: string,
        public type: UserType,
        public createdPost: Post[],
        public updatedPost: Post[],
        public description: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
    
    public static fromJson(obj: Record<string, any>): UserEntity {
        const {
            id, name, login,
            password, image, type,
            createdPost, updatedPost, description,
            createdAt, updatedAt
        } = obj;

        return new UserEntity(
            id, name, login,
            password, image, type,
            createdPost, updatedPost, description,
            createdAt, updatedAt
        );
    }
}