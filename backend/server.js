require("dotenv").config(); // To use the .env file
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router"); // Importing the router from auth-router.js
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");




const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads

// Mounting the router : To use the router in server.js
app.use("/api/auth", router); // Using the router in server.js



// Error Middleware
app.use(errorMiddleware);



const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
