const express = require("express");
const connectToDb = require("./db/connectToDb");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const conf = require("./conf/conf")
const cors = require("cors")

console.log("");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
connectToDb();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/user", require("./routes/createUser"));
app.use("/user" ,require("./routes/loginUser"));
app.use("/user", require("./routes/updateDetails"))
app.use("/progress", require("./routes/progress"))

app.listen(process.env.PORT, () => {
  console.log("Server running",process.env.PORT);
});
