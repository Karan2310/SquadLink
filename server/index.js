import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import teamRoutes from "./routes/teams.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! - SqaudLink");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(8001, () => {
      console.log("Server listening on port 8001");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
