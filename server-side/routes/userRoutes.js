const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/users", userController.postUser)
router.get("/users/:id", userController.getUserById)
router.put("/users/:id", userController.updateUser)
router.delete("/users/:id", userController.deleteUser)
router.get("/analytics/users", userController.getAnalytics)
router.get("/analytics/users/top-active", userController.getAnalyticsByTopActive)

module.exports = router