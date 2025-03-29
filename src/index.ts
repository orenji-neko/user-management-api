import Express from "express";
import type { Request, Response } from "express";
import "reflect-metadata";
import createDatabase from "./database";
import { User } from "./models/User";
require("dotenv").config();

const database = createDatabase(
  process.env.DB_HOST || "localhost",
  process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 3306,
  process.env.DB_USERNAME || "root",
  "",
  process.env.DB_NAME || "intprog"
);

const app = Express();
const userRepository = database.getRepository(User);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/**
 * [GET] /users/
 * @author INSERT NAME HERE
 */
app.get("/users", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

/**
 * [POST] /users/
 * @author INSERT NAME HERE
 */
app.post("/users", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

/**
 * [DELETE] /users/:id
 * @author Yancha
 */
app.delete("/users/:id", async (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
  
  try {
    const userId = parseInt(req.params.id);
    
    // Check if the user exists
    const user = await userRepository.findOneBy({ id: userId });
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    
    // Delete the user
    await userRepository.delete("")
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.listen(3000, (err) => {
  console.log("Server running...");
});

database
  .initialize()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error connecting to database...");
  });
