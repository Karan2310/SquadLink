import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const alreadyRegistered = await User.findOne({ email: email });
    if (alreadyRegistered)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: ` ${savedUser.email} registered successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verified.id);
      if (!user)
        return res.status(401).json({ msg: "No user found with this token" });

      res
        .status(200)
        .json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
