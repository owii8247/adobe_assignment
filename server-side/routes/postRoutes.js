const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")

router.post("/posts", postController.postPosts)
router.get("/posts/:id", postController.getPostById)
router.put("/posts/:id", postController.updatePosts)
router.delete("/posts/:id", postController.deletePosts)
router.post("/posts/:id/like", postController.postLike)
router.post("/posts/:id/unlike", postController.postUnlike)
router.get("/analytics/posts", postController.getTotalPost)
router.get("/analytics/posts/top-liked", postController.getTopPostByLike)

module.exports = router