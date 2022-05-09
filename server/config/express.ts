import express from "express";
import "reflect-metadata";
import routes from "../routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import path from "path";

// import options from '../swagger.option'
// import swaggerUi from 'swagger-ui-express';
// import swaggerJsdoc from 'swagger-jsdoc';

const server = express();

// if (process.env.NODE_ENV !== 'production') {
//     server.use(cors({
//         origin: '*'
//     }));
// }

server.use(
  cors({
    origin: "https://ngng2.shop",
    credentials: true,
  })
);
// const swaggerSpec = swaggerJsdoc(options);
// server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("dotenv").config();
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
server.use(hpp());
server.use(helmet({ contentSecurityPolicy: false }));
// server.use(express.static('uploads'));
// server.use(express.static(path.join(__dirname, '../public')))
server.use("/api", routes);

const basePath = [__dirname, "../"];
if (process.env.NODE_ENV !== "production") {
  basePath.push("build/");
}
if (process.env.NODE_ENV_DEV === "true") {
  basePath.push("build/");
}
server.use(express.static(path.join(...basePath, "dist")));
server.get("/*", function (req, res) {
  res.sendFile(path.join(...basePath, "dist", "index.html"));
});

export default server;
