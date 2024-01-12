const express = require('express')
const router = express.Router()
const {authenticate} = require('../middleware/authentication.js')

const {createTask, deleteTask, updateTask, getTask, getAlltask} = require('../controllers/taskController')
router.post('/create-task',authenticate, createTask)
router.get('/get-tasks', authenticate, getAlltask)
router.get('/get-task', authenticate, getTask)
router.delete('/delete-task', authenticate, deleteTask)
router.patch('/update-task', authenticate, updateTask)





module.exports = router