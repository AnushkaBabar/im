require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static("public"));

// routes
const timeslotRouter = require("./app/routes/timeslots");
const teacherRouter = require("./app/routes/teacher");

app.use("/timeslot", timeslotRouter);
app.use("/timeslot", teacherRouter);

app.listen(3000, () => console.log("Listening on 3000"));