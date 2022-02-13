const express = require('express')
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')
const router = express.Router()
router.post('/',auth,postController.createPost)
router.get('/',auth,postController.getPosts)
router.put('/:id',auth,postController.updatePost)
router.delete('/:id',auth,postController.deletePost)
router.put('/like/:id',auth,postController.like)
router.put('/unlike/:id',auth,postController.unlike)
router.put('/comment/:id',auth,postController.addComment)
router.put('/comment/:id/:commId',postController.deleteComment)

module.exports = router