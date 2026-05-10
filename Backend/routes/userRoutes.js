
import { getUserDetails, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

// register route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// get user details route
router.get("/getUserDetails", getUserDetails);

// logout route
router.post("/logout", logoutUser);

// refresh token route
router.post("/refreshToken", refreshAccessToken);


export default router;