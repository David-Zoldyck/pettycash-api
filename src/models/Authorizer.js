import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const authorizerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Authorizer = mongoose.model("Authorizer", authorizerSchema);

authorizerSchema.plugin(mongooseAutoPopulate);

export default Authorizer;
