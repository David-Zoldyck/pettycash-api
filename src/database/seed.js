import mongoose from "mongoose";
import Authorizer from "#models/Authorizer";
import seedData from "./seeds/authorizers/seedData.js";

// await mongoose.connect(process.env.DB_URI);

export default async function seedDatabase() {
  try {
    await Authorizer.deleteMany();

    await Authorizer.insertMany(seedData);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Err:", error);
  }
}
