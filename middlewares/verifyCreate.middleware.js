const db = require('../models/index.model');
const User = db.user;

checkDuplicateEmail = (req, res, next) => {

    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        if (user) {
            return res.status(400).send({ message: 'Email already in use' });
        }

        next();
    })
}

const verifyEmail = {
    checkDuplicateEmail,
};

module.exports = verifyEmail;