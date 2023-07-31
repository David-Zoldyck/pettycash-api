import User from "#models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "#models/Token";
import crypto from "crypto";
import sendMail from "#mailers/mailer";
import forgotPasswordMailer from "#mailers/forgotPasswordMailer";

const register = async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;

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
      email,
    });

    await newUser.save();
    res.status(201).send({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
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
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const currentUser = (req, res) => {
  res.json(req.user);
  console.log(res.json(req.user));
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ error: "user with given email doesn't exist" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        user: user._id,
        token: code.toString(),
      }).save();
    }

    await sendMail(
      user.email,
      "Password Reset",
      forgotPasswordMailer(user, token.token)
    );

    return res.send({
      message: "password reset code sent to your email account",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ error: "Invalid or expired code" });

    const token = await Token.findOne({
      user: user._id,
      token: code,
    });

    if (!token)
      return res.status(400).send({ error: "Invalid or expired code" });

    user.password = req.body.password;
    await user.save();
    await Token.findByIdAndDelete(token._id);

    return res.send({ message: "password reset successfully" });
  } catch (e) {
    console.error(e);
    return res.send({ error: "Server error" });
  }
};

export { register, login, currentUser, forgotPassword, resetPassword };
