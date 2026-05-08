import express from "express";
import authRoute from "./routes/userRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import cookiesParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookiesParser());
app.use(express.json());


app.use("/api/auth", authRoute);

await connectDB();

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
