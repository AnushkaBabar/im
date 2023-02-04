const express = require("express");
const {
    postTimeslot,
    getTimeslots
} = require("../controllers/timeslots")
const router = express.Router();

router.post("/", postTimeslot);
router.get("/", getTimeslots);

module.exports = router;