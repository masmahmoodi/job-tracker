import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "../db/queries/usersQueries.js";

export async function signup(req, res) {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function login(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    email = email.trim().toLowerCase();

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Successful login",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
