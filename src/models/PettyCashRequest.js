import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const pettyCashRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    accountDetails: {
      number: { type: String, required: true, minLength: 10, maxLength: 10 },
      accountName: { type: String, required: true },
      bank: { type: String, required: true },
    },
    items: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    authorizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authorizer",
      required: true,
      autopopulate: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    superadminstatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    imageUrl: { type: String },
    rejectReason: String,
    rejectReasonFinal: String,
  },
  { timestamps: true }
);

const PettyCashRequest = mongoose.model(
  "PettyCashRequest",
  pettyCashRequestSchema
);

pettyCashRequestSchema.plugin(mongooseAutoPopulate);

export default PettyCashRequest;
