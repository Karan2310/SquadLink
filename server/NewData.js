// importUsers.js

import mongoose from "mongoose";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import User from "./models/User.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function importUsers() {
  try {
    const jsonFilePath = path.join(__dirname, "heliverse_mock_data.json"); // Update the path accordingly

    // Read the JSON file
    const usersData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.osj3s9z.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Insert data into the MongoDB collection
    await User.insertMany(usersData);

    console.log("Users imported successfully");
  } catch (error) {
    console.error("Error importing users:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the function to import users
importUsers();
