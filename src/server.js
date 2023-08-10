import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "#routes";
import connect from "#utils/startServer";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Setting the view engine
app.set("view engine", "ejs");

// Setting the views directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to YB crip",
  });
});

connect(app, port);
