import User from "#models/User";
import jwt from "jsonwebtoken";

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    if (token === "") {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }
    const claims = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!claims) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const user = await User.findById(claims.id);

    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .send({ error: "this action requires admin privileges" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default checkAdmin;
