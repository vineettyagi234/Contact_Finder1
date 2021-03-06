const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

// database connect
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Find"));

app.use("/api/users", require("./routes/users"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/contacts", require("./routes/contact"));

// server static assests in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is start on port ${PORT}`));
