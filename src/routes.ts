import { Router } from "express";
import { UserRoutes } from "./features/users/presentation/routes/user.routes";

export class Routes {
    static get routes(): Router {
        const router = Router();
        
        router.use("/api", UserRoutes.routes);

        return router;
    }
}