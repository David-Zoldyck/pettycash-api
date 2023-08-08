import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "#routes";
import connect from "#utils/startServer";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to YB crip",
  });
});

connect(app, port);
