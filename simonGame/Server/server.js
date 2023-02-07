const express = require("express");
const cors = require("cors");

// Load express const
const port = process.env.BACKEND_PORT || 4000;
const app = express();

// Import mongoose database connection
const Database = require("./db/DBconnection");

// Parsing body and url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cors
app.use(cors());

// Load the .env file
require("dotenv").config();

// Initialize routes
const { scoreRouter } = require("./routers/scoreRouter");

// Route
app.use("/api/scores", scoreRouter);

// Connect to DB and listening to the server
app.listen(process.env.BACKEND_PORT, async () => {
  let uri = process.env.MONGO_URI;
  const DateBase = new Database(uri);
  await DateBase.connectToDB();
  console.log(`[+] Listening on PORT: ${process.env.BACKEND_PORT}`);
});