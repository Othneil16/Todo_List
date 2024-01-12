const express = require('express')
const router = express.Router()

const {createsubTask, getSubtask, getAllSubtask, deleteSubtask} = require('../controllers/subtaskController')

router.post('/post-subtask', createsubTask)
// router.get('/get-subtask/:id', getSubtask)
// router.get('/get-subtasks', getAllSubtask)
// router.delete('/delete-subtask/:id', deleteSubtask)




 module.exports = router