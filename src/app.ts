import express, { Response, Request } from "express";
const app = express();
import { config } from "dotenv";
config();
import {
  server_timeout_middleware,
  error_handler_middleware,
} from "./handlers/middlewares/index";
import routes from "./handlers/routes";
import { logger } from "./utils/abstractions/logger";
import { app_configuration as app_config } from "./configs/app_config";
import { db_config } from "./configs/db_config";
import sessions from "express-session";
import pg_session_store from "connect-pg-simple";
import recurring_jobs from "./workers/config/fetch_jobs";
import processrecurringjob from "./workers/config/processitems";

process.on("uncaughtException", (e: any) => {
  logger.error(e, "UNCAUGHT-EXCEPTION-ERROR");
  process.exit(1);
});

process.on("unhandledRejection", (e: any) => {
  logger.error(e, "UNCAUGHT-REJECTION-ERROR");
  process.exit(1);
});

db_config
  .initialize()
  .then(() => {
    logger.info({ msg: "Database connected!" }, "database connected");
  })
  .catch((err) => {
    logger.error(err, "DATABASE-CONNECTION-ERROR");
    throw new Error("cannot connect to database");
  });

if (process.env.RECURRING_QUEUE) {
  recurring_jobs();
}

if (process.env.PROCCESS_RECURRING_WORKER) {
  processrecurringjob();
}

const session_store = new (pg_session_store(sessions))({
  createTableIfMissing: true,
  conString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

app.use(
  sessions({
    secret: process.env.SESSION_SECRET || " ",
    resave: false,
    saveUninitialized: false,
    store: session_store,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  return res.status(404).json({
    status: "success",
    message: "app is running",
  });
});
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    status: "error",
    message: "route not found",
  });
});

// server timeout
if (app_config.enable_request_timeout) {
  app.use(server_timeout_middleware);
}

//error handling
app.use(error_handler_middleware);

export { app };
