import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const authorizerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

authorizerSchema.statics.findOneOrCreate = function (condition, doc) {
  const self = this;
  const newDocument = doc;
  return new Promise((resolve, reject) => {
    return self
      .findOne(condition)
      .then((result) => {
        if (result) {
          return resolve(result);
        }
        return self
          .create(newDocument)
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
authorizerSchema.plugin(mongooseAutoPopulate);
const Authorizer = mongoose.model("Authorizer", authorizerSchema);

export default Authorizer;
