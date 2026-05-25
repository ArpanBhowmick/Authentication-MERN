import express from "express";
import authRoute from "./routes/userRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


await connectDB();

app.use("/api/auth", authRoute);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
