const express = require("express");
const userRouter = require("./router/userRouter");
const categoryRouter = require("./router/categoryRouter");
const subcatRouter = require("./router/subcatRouter");
const complaintRouter = require("./router/complaintRouter");
const profileRouter = require("./router/profileRouter");
const complaintRemarksRouter = require("./router/complaintRemarksRouter");
const feedbackRouter = require("./router/feedbackRouter");

require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);
app.use(subcatRouter);
app.use(complaintRouter);
app.use(profileRouter);
app.use(complaintRemarksRouter);
app.use(feedbackRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
