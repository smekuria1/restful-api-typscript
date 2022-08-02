import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import swaggerDocs from "./utils/swagger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
const port = config.get<number>("port");
export const app = express();
app.use(express.json());

app.use("/api", deserializeUser);
app.listen(port, async () => {
  logger.info(`Server is running on port http://localhost:${port}`);

  await connect();

  routes(app);

  swaggerDocs(app, port);
});
