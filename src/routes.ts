import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   *      404:
   *       $ref: '#/components/responses/UnauthorizedError'
   *
   */

  app.post("/api/users", validate(createUserSchema), createUserHandler);
  /**
   * @openapi
   *  '/api/sessions':
   *   post:
   *      tags:
   *         - User
   *      summary: Login user and create a session
   *
   *
   */
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  /**
   * @openapi
   *  '/api/sessions':
   *   get:
   *      tags:
   *         - User
   *      summary: Get user session
   *
   *
   */
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  /**
   * @openapi
   *  '/api/sessions':
   *   delete:
   *      tags:
   *         - User
   *      summary: Delete user session
   *
   *
   */

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  /**
   * @openapi
   * '/api/products':
   *  post:
   *     tags:
   *     - Products
   *     summary: Get a product by the productId
   *     responses:
   *       200:
   *         description: Success response with product
   *       404:
   *         description: Product not found
   */
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  /**
   * @openapi
   * '/api/products/{productId}':
   *  put:
   *     tags:
   *     - Products
   *     summary: Update a product by productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success update product
   *       404:
   *         description: Product not found
   */
  app.get(
    "/api/products/:productId",
    [validateResource(getProductSchema)],
    getProductHandler
  );
  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
  /**
   * @openapi
   * '/api/products/{productId}':
   *  delete:
   *     tags:
   *     - Products
   *     summary: Delete a product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success deleted
   *       404:
   *         description: Product not found
   */
}

export default routes;
