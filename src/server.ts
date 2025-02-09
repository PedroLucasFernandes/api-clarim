import express, { Request, Response } from "express";
import prisma from "./core/config/db";
import { Routes } from "./routes";

const app = express();
const port = 8080;

async function main() {
    app.use(express.json());
    app.use("/", Routes.routes);

    app.all("*", (req: Request, res: Response) => {
        res
            .status(404)
            .json({ 
                error: `Route ${req.originalUrl} not found` 
            });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });