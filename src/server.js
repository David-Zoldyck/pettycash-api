import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import routes from "#routes";
import connect from "#utils/startServer";
import path from "path";
import * as url from "url";

dotenv.config();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const staticAssets = path.join(process.cwd(), "public");

const app = express();
const port = process.env.PORT;

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(staticAssets));
app.use("/api", routes);

app.use("*", express.static(staticAssets));
// Setting the view engine
app.set("view engine", "ejs");

// Setting the views directory
app.set("views", path.join(__dirname, "views"));

connect(app, port);
