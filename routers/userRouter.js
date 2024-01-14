const express = require('express')
const router = express.Router()

const {signUp, signIn, getAllUser, signOut, getUser} = require('../controllers/userController')
const {authenticate} = require('../middleware/authentication')
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/get-users', getAllUser)
router.put('/sign-out', authenticate, signOut)
router.get('/get-user', authenticate, getUser)


module.exports = router