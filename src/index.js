const express = require("express");
const cors = require("cors");
const userRouter = require("./router/userRouter");
const categoryRouter = require("./router/categoryRouter");
const subcatRouter = require("./router/subcatRouter");
const complaintRouter = require("./router/complaintRouter");
const profileRouter = require("./router/profileRouter");
const complaintRemarksRouter = require("./router/complaintRemarksRouter");
const feedbackRouter = require("./router/feedbackRouter");
const stateRouter = require("./router/stateRouter");
const router = require("./router/dashboardRouter");
const dashboardRouter = require("./router/dashboardRouter");

require("./db/db");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);
app.use(subcatRouter);
app.use(complaintRouter);
app.use(profileRouter);
app.use("/public", express.static("public"));
app.use(complaintRemarksRouter);
app.use(feedbackRouter);
app.use(stateRouter);
app.use(dashboardRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
