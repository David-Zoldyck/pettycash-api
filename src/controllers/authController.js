import User from "#models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    //check if user exists
    const alreadyExists = await User.findOne({ username });

    if (alreadyExists) {
      res.status(422).send({ error: "User already exists" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).send({ error: "password does not match" });
      return;
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();
    res.status(201).send({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Try again bozo" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if user exists
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //check for password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const currentUser = (req, res) => {
  res.json(req.user);
};

export { register, login, currentUser };
