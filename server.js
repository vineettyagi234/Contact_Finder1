const express = require("express");

const connectDB = require("./config/db");

const app = express();

// database connect
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Find"));

app.use("/api/users", require("./routes/users"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is start on port ${PORT}`));
