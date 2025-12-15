const mongoose = require("mongoose");

// Replace the connection string below with YOUR real string
mongoose.connect("mongodb+srv://wgil_taskpro_user:Hall0ween!!!@cluster0.t63yywj.mongodb.net/?appName=Cluster0")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");  // ⭐ ADD THIS



app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/tasks", taskRoutes);
app.listen(3000, "0.0.0.0", () => {
  console.log("Server available on http://localhost:3000");
});
