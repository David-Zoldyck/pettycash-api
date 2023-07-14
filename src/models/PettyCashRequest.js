import mongoose from "mongoose";

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
        amount: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    authorizedBy: { type: String, required: true },
  },
  { timestamps: true }
);

const PettyCashRequest = mongoose.model(
  "PettyCashRequest",
  pettyCashRequestSchema
);

export default PettyCashRequest;
