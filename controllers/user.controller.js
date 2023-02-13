const db = require('../models/index.model');
var bcrypt = require('bcryptjs');

const User = db.user;

exports.getUser = (req, res) => {
    User.find({ id: req.params.id })
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }

            return res.status(200).send({ message: 'user fetched', data: user });
        })
}

exports.getAllUsers = (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }

            return res.status(200).send({ message: 'users fetched', data: users });
        })
}

exports.createUser = (req, res) => {
    User.find().limit(1).sort({ $natural: -1 })
        .exec((err, user) => {

            const id = user[0] && user[0].id ? user[0].id + 1 : 1;
            const newUser = new User({
                id,
                email: req.body.email,
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password, 8),
            })

            newUser.save((err, user) => {
                if (err) {
                    return res.status(500).send({ message: err.message })
                }

                return res.send({ message: 'The user has been created.', user });
            })

        })
}

exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ id: req.params.id }, { $set: req.body })
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err.message })
            }

            return res.send({ message: 'The user has been updated.', user });
        })
}

exports.deleteUser = (req, res) => {
    User.findOneAndRemove({ id: req.params.id })
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err.message })
            }

            return res.send({ message: 'The user has been deleted.', user });
        })
}