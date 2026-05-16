import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401).json({
      message: "Access Token Missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // store decoded info in request so later controllers can use it.
    req.userId = decoded.id;

    next();

  } catch (error) {

    return res.sendStatus(403).json({
      message: "Invalid Access Token",
    });
  }
};

export default verifyJWT;
