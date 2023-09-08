import mongoose from "mongoose";
import Authorizer from "#models/Authorizer";
import seedData from "./seedData.js";
import dotenv from "dotenv";

dotenv.config();
await mongoose.connect(process.env.DB_URI);

async function seedDatabase() {
  try {
    await Authorizer.deleteMany();

    await Authorizer.insertMany(seedData);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Err:", error);
  } finally {
    await mongoose.connection.close();
  }
}

await seedDatabase();
