import { type NextFunction, type Request, type Response } from "express";
import { type UserEntity } from "../../domain/entities/user.entity";
import { type UserRepository } from "../../domain/repositories/user.repository";
import { GetAllUsers } from "../../domain/usecases/getAll.usecase";
import { GetUsers } from "../../domain/usecases/get.usecase";
import { CreateUsers } from "../../domain/usecases/create.usecase";
import { CreateUserDTO, LoginResponseDTO, ProfileUserDTO, UpdateUserDTO } from "../../domain/dto/user.dto";
import { UpdateUsers } from "../../domain/usecases/update.usecase";
import { DeleteUsers } from "../../domain/usecases/delete.usecase";
import { LoginUsers } from "../../domain/usecases/login.usecase";
import { ProfileUsers } from "../../domain/usecases/profile.usecase";

/**
 * Utilizar o formato de Arrow Function em todos os métodos do
 * controller para evitar utilizar o .bind() nos arquivos de routas,
 * dessa forma, os métodos são, na verdade, variáveis e persistem
 * informações(parâmetros) passadas anteriormente. Ao contrário da sintaxe
 * de métodos e função que não armazena essas informações, criando alocando
 * um espaço novo na memória a cada chamada e sendo liberado logo após a
 * chamada acabar. 
*/
export class UserController {
    constructor(
        private readonly repository: UserRepository
    ) {}

    /**
     * Busca todos os usuários registrados no banco de dados
     * 
     * @param _req 
     * @param res 
     * @param next
     * 
    */
    public getAll = (
        _req: Request<unknown, unknown, unknown, unknown>,
        res: Response<UserEntity[]>,
        next: NextFunction,
    ): void => {
        new GetAllUsers(this.repository)
            .execute()
            .then((result) => res.json(result))
            .catch((err) => {
                next(err);
            });
    }

    public get = (
        _req: Request<{id: string}>,
        res: Response<UserEntity>,
        next: NextFunction,
    ): void => {
        const { id } = _req.params;
        new GetUsers(this.repository)
            .execute(id)
            .then((result) => res.json(result))
            .catch((err) => { next(err); })
    }

    public create = (
        _req: Request<CreateUserDTO>,
        res: Response<CreateUserDTO>,
        next: NextFunction,
    ): void => {
        const data = _req.body;

        new CreateUsers(this.repository)
            .execute(data)
            .then((result) => res.json(result))
            .catch((err) => { next(err); })
    }

    public update = (
        _req: Request<{ id: string }, any, UpdateUserDTO>,
        res: Response<string>,
        next: NextFunction,
    ): void => {
        const { id } = _req.params;
        const data = _req.body;

        new UpdateUsers(this.repository)
            .execute(id, data)
            .then((result) => res.json(result))
            .catch((err) => { next(err); })
    }

    public delete = (
        _req: Request<{ id: string }>,
        res: Response<string>,
        next: NextFunction,
    ): void => {
        const { id } = _req.params;

        new DeleteUsers(this.repository)
            .execute(id)
            .then((result) => res.json(result))
            .catch((err) => { next(err); })
    }

    public login = (
        _req: Request<{ login: string, passwd: string }>,
        res: Response<LoginResponseDTO>,
        next: NextFunction,
    ): void => {
        const data = _req.body;
        new LoginUsers(this.repository)
            .execute(data)
            .then((result) => res.status(200).json(result))
            .catch((err) => { next(err); })
    }

    public profile = (
        _req: Request<any>,
        res: Response<ProfileUserDTO>,
        next: NextFunction, 
    ): void => {
        const { authorization } = _req.headers;
        new ProfileUsers(this.repository)
            .execute(authorization!!)
            .then((result) => res.status(200).json(result))
            .catch((err) => { next(err); })
    }
}