import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import mongooseAutoPopulate from "mongoose-autopopulate";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

userSchema.plugin(mongooseAutoPopulate);

export default User;
