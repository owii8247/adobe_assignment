const postModel = require("../models/PostModel")

const postPosts = async (req, res) => {
    try {
        const posts = new postModel(req.body);
        await posts.save();
        res.status(201).send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getPostById = async (req, res) => {
    try {
        const posts = await postModel.findById(req.params.id);
        if (!posts) {
            return res.status(404).send();
        }
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updatePosts = async (req, res) => {
    try {
        const posts = await postModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!posts) {
            return res.status(404).send();
        }

        res.send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deletePosts = async (req, res) => {
    try {
        const posts = await postModel.findByIdAndDelete(req.params.id);
        if (!posts) {
            return res.status(404).send();
        }

        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

const postLike = async (req, res) => {
    try {
        const posts = await postModel.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!posts) {
            return res.status(404).send();
        }

        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

const postUnlike = async (req, res) => {
    try {
        const posts = await postModel.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: -1 } },
            { new: true }
        );

        if (!posts) {
            return res.status(404).send();
        }

        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getTotalPost = async (req, res) => {
    try {
        const count = await postModel.countDocuments();
        res.send({ count });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getTopPostByLike = async (req, res) => {
    try {
        const posts = await postModel.find().sort({ likes: -1 }).limit(5);
        res.send(posts);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getPostById,
    postPosts,
    updatePosts,
    deletePosts,
    postLike,
    postUnlike,
    getTotalPost,
    getTopPostByLike
}