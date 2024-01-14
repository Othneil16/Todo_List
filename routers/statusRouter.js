const express = require('express')
const router = express.Router()

const {createStatus, getStatus, getAllStatus} = require('../controllers/statusController')

router.post('/post-status', createStatus)
router.get('/get-Status', getStatus)
router.get('/get-Status', getAllStatus)



module.exports = router