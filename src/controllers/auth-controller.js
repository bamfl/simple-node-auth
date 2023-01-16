import * as dotenv from "dotenv";
import User from "../models/user-model.js";
import Role from "../models/role-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

dotenv.config();

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .send({ errorMessage: `User with email ${email} already exists` });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const role = await Role.findOne({ value: "USER" });

      await User.create({ email, password: hashPassword, roles: [role.value] });

      const token = jwt.sign(
        { email, roles: [role.value] },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res
        .status(201)
        .send({ message: "User created successfully", token });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .send({ errorMessage: `User with email ${email} does not exists` });
    }

    const isCorrectPassword = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res.status(400).send({ errorMessage: `Incorrect password` });
    }

    const token = jwt.sign(
      { email, roles: existingUser.roles },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).send({ token });
  }
}

export default new AuthController();
