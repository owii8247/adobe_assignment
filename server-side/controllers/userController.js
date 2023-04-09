const userModel = require("../models/UserModel")


const postUser = async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }

}

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

const getAnalytics = async (req, res) => {

}

const getAnalyticsByTopActive = async (req, res) => {

}
module.exports = {
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    getAnalytics,
    getAnalyticsByTopActive
}