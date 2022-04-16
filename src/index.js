const express = require("express");
const userRouter = require("./router/userRouter");

require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
