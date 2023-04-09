const userModel = require("../models/UserModel")
const postModel = require("../models/PostModel")


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

    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }

}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }

        // also delete all posts associated with the user
        await postModel.deleteMany({ user_id: req.params.id });

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAnalytics = async (req, res) => {
    try {
        const count = await userModel.countDocuments();
        res.send({ count });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAnalyticsByTopActive = async (req, res) => {
    try {
        const users = await userModel.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "posts",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    postCount: { $size: '$posts' },
                },
            },
            {
                $sort: { postCount: -1 },
            },
            {
                $limit: 5,
            },
        ]);

        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    getAnalytics,
    getAnalyticsByTopActive
}