const { Timeslot, theoryTimeslots, laboratoryTimeslots, conferenceTimeslots } = require("../models/Timeslot");

const postTimeslot = async (req, res, next) => {
	try {
		const { classroom, date, timeslot, available, teacher, type } = req.body;

		let allowedTimeslots;
		if (type == 'theory') {
			allowedTimeslots = theoryTimeslots;
		} else if (type == 'laboratoty') {
			allowedTimeslots = laboratoryTimeslots;
		} else if (type == 'conference') {
			allowedTimeslots = conferenceTimeslots;
		}

		if (!allowedTimeslots.includes(timeslot)) {
			return res.status(400).send({ error: 'Invalid timeslot' });
		}

		const existingTimeslot = await Timeslot.findOne({ classroom, date, timeslot, type });
		if (existingTimeslot != null) {
			existingTimeslot.available = available;
			existingTimeslot.teacher = teacher;
			await existingTimeslot.save()
			return res.status(204).json(existingTimeslot);
		}

		const newTimeslot = new Timeslot({
			classroom,
			date,
			timeslot,
			available,
			teacher,
			type,
		});

		await newTimeslot.save();
		return res.status(201).json(newTimeslot);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const getTimeslots = async (req, res, next) => {
	const { date, classroom, timeslot, type } = req.query;

	let timeslots;
	let query = {};
	if (date) {
		query["date"] = date;
	}
	if (classroom) {
		query["classroom"] = classroom;
	}
	if (timeslot) {
		// timeslots = await Timeslot.find({ date, timeslot });
		query["timeslot"] = timeslot;
	}
	if (type) {
		query["type"] = type;
	}

	timeslots = await Timeslot.find(query);

	if (!timeslots) {
		return res.status(404).send({ error: 'Timeslots not found' });
	}

	return res.send(timeslots);
}

module.exports = {
	postTimeslot,
	getTimeslots
}