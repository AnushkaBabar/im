const express = require("express");
const app = express();

app.use(express.static("public"));

// routes
const timeslotRouter = require("./app/routes/timeslots");

app.use("/timeslot", timeslotRouter);

app.listen(3000, () => console.log("Listening on 3000"));