import User from "#models/User";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
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

  req.user = await User.findById(claims.id);

  next();
};

export default checkAuth;
