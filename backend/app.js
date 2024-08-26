const express = require("express");
const connectToDb = require("./db/connectToDb");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const conf = require("./conf/conf")

console.log("");
const app = express();
app.use(express.json());
app.use(cookieParser());
connectToDb();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/user", require("./routes/createUser"));
app.use("/user" ,require("./routes/loginUser"));
app.use("/user", require("./routes/updateDetails"))
app.use("/progress", require("./routes/progress"))

app.listen(conf.port, () => {
  console.log("Server running");
});
