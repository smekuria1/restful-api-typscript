import { Response, Request, NextFunction } from "express";
import { get } from "lodash";
import { reIssueAcessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");
  if (!accessToken) {
    return res.sendStatus(404);
  }
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAcessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);
    console.log(newAccessToken);
    res.locals.user = result.decoded;

    return next();
  }

  return next();
};

export default deserializeUser;
