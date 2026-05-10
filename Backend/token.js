import jwt from "jsonwebtoken";


// access token generator
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      roles: user.roles,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

// refresh token generator
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      roles: user.roles,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "1d" }
  );
};
