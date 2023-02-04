const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).send({ error: 'No token, authorization denied' });
	}
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SCRET);
		req.teacher = decoded.teacher;
		next();
	} catch (err) {
		return res.status(401).send({ error: 'Token is not valid' });
	}
};

module.exports = auth;