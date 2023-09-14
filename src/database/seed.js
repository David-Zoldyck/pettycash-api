import Authorizer from "#models/Authorizer";
import seedData from "./seeds/authorizers/seedData.js";

export default async function seedDatabase() {
  try {
    // await Authorizer.deleteMany();

    // await Authorizer.insertMany(seedData);

    seedData.forEach((data) => {
      Authorizer.findOneOrCreate({ email: data.email }, data);
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Err:", error);
  }
}
