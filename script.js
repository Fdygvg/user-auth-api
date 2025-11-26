import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
const port = process.env.PORT;
const app = express();
//Connect MongoDB
connectDB();

app.use(express.json())
app.use("/api/", userRoutes.getRouter());

app.listen(port, () => {
  console.log(`Server Is Running On Port ${port} ✅`);
});
