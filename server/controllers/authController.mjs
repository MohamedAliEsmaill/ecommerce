import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.mjs";

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.API_SECRET);
};

export const signup = async (req, res) => {
  try {
    const { fullName, email, username, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      phone,
    });

    const savedUser = await newUser.save();
    const accessToken = generateAccessToken(savedUser._id);
    savedUser.accessToken = accessToken;
    await savedUser.save();

    res.status(200).send({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        fullName: savedUser.fullName,
        username: savedUser.username,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while signing up.",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // Session token for the remember the user on login
    const sessionToken = jwt.sign(
      { id: user._id },
      process.env.SESSION_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
      },
      message: "Login successful",
      sessionToken: sessionToken,
      accessToken: accessToken,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || "An error occurred while signing in." });
  }
};
