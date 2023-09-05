import User from "#models/User";
import jwt from "jsonwebtoken";

export const checkRole =
  (...role) =>
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      if (!role.includes(req.user.role)) {
        return res
          .status(401)
          .send({ error: "this action requires admin privileges" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };

export const checkAdmin = checkRole("admin");
export const checkUser = checkRole("user");
export const checkSuperAdmin = checkRole("superadmin");

export default checkRole;
