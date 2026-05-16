import { generateAccessToken, generateRefreshToken } from "../token.js";
import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register controller
export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      // roles automatically = [2001]
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  login controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // const token = jwt.sign({ id: user._id, roles }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    console.log(user);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    });
    // console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// get users details
export const getUserDetails = async (req, res) => {
  try {
    // middlewarecode
    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(" ")[1];

    // if (!token) {
    //   return res.status(401).json({ message: "Access Token Missing" });
    // }

    // const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    //  main code
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Token Missing",
      error: error.message,
    });
  }
};

//  refresh token controller
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token Missing" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    // This line ONLY makes sense if you are ALSO storing refresh token in DB.
    // if (!user || user.refreshToken !== refreshToken) {
    //   return res.status(403).json({ message: "Invalid Refresh Token" });
    // }

    if (!user) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Invalid or Expired Refresh Token", error });
  }
};

// logout controller
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // this is for locally testing, in production secure should be true and sameSite should be none
    // res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
