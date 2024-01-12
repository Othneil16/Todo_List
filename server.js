const express = require('express')
const config =  require('./config/config')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const subtaskRouter = require('./routers/subtaskRouter')
const statusRouter = require('./routers/statusRouter')


const port = process.env.port
const app = express()
app.use(express.json())
app.use('/api/v1/user', userRouter )
app.use('/api/v1/task', taskRouter )
app.use('/api/v1/subtask', subtaskRouter )
app.use('/api/v1/status', statusRouter )
app.use('/', (req, res)=>{
    res.send('This is a to-do list software, where you can pick up and schedule a task trace or track it, till its done')
})

app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`)
})