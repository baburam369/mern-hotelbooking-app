import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes); //route to add hotel, edit and view
app.use("/api/hotels", hotelRoutes); //routes for visitors to search hotels, view etc

/* 
*** catch all route ***
## The app.get("*", ...) route matches any request that hasn't been handled by previous routes (like /api/auth, /api/users, etc.)

## If the user tries to directly access a route (like /about, /contact, etc.) in their browser, 
the server needs to return the index.html file, which then loads the SPA, and the frontend's JavaScript code takes over the routing.

## The res.sendFile(path.join....) ensures that the server always responds with the index.html file for any route that doesn't match an existing server-side route (like /api/auth, /api/users, etc.). This allows the frontend to handle the routing and render the appropriate view.
*/
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

/*      ****    ****    */

app.get("/api/test", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port} `);
});
