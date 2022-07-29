import express from "express";
import config from "config";

import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
export const app = express();
app.use(express.json());
const port = config.get<number>("port");

app.use(deserializeUser);
app.listen(port, async () => {
  logger.info(`Server is running on port http://localhost:${port}`);

  await connect();

  routes(app);
});
