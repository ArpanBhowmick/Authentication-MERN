
import { getUserDetails, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
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


export default router;