import User from "#models/User";
import jwt from "jsonwebtoken";

const checkAdmin = async (req, res, next) => {
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
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  if (user.role === "admin") {
    req.user = user;
    next();
  } else {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
};

export default checkAdmin;
