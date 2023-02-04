const express = require("express");
const {
    postTimeslot,
    getTimeslots
} = require("../controllers/timeslots");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, postTimeslot);
router.get("/", auth, getTimeslots);

module.exports = router;