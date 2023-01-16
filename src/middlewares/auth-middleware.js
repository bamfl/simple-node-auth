import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const errorHandler = (res, error) => {
  console.dir(error);
  res.status(401).send({ errorMessage: "Unauthorized", error });
};

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return errorHandler(res, { message: "No Bearer token" });

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = user;

    next();
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default authMiddleware;
