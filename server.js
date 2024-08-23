require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT;
const firebaseAdmin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_ADMIN_SDK_JSON_PATH, "utf8")
);

const storyRoutes = require("./routes/storyRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// server test api
app.get("/test", (req, res) => {
  res.send("Server running successfully");
});

// API Routes
app.use("/api/stories", storyRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
