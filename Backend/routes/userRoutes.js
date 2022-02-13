const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')
const router = express.Router()
router.get('/',auth,userController.getUsers)
router.get('/me',auth,userController.getProfile)
router.get('/:id',auth,userController.getUserById)
router.post('/',auth,userController.updateUser)
router.put('/:id/follow', auth, userController.follow)
router.put('/:id/unfollow', auth, userController.unfollow)
module.exports = router