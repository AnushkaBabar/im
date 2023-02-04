const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		let teacher = await Teacher.findOne({ email });
		if (!teacher) {
			return res.status(400).send({ error: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, teacher.password);
		if (!isMatch) {
			return res.status(400).send({ error: 'Invalid credentials' });
		}

		const payload = {
			teacher: {
				id: teacher.id,
			},
		};

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				res.send({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}

module.exports = {
	login,
}