const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

const auth = require("./routes/auth");
const company = require("./routes/company");
const booking = require("./routes/booking");

app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/companies", company);
app.use("/api/v1/booking", booking);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    "Server is running in",
    process.env.NODE_ENV,
    "mode on port",
    PORT
  );
});
