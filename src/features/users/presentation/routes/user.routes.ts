import { Router } from "express";
import { UserRepositoryImpl } from "../../infra/repository/user.repository.impl";
import prisma from "../../../../core/config/db";
import { UserController } from "../controller/user.controller";

// NOTE: when creating a /login route, avoid to use /user/login
export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const repository = new UserRepositoryImpl(prisma);
        const controller = new UserController(repository);

        router.get("/user", controller.getAll);
        router.get("/user/:id", controller.get);
        router.get("/profile", controller.profile);
        router.post("/user", controller.create);
        router.post("/login", controller.login);
        router.put("/user/:id", controller.update);
        router.delete("/user/:id", controller.delete);

        return router;
    }
}