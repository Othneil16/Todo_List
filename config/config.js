const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.link

mongoose.connect(db)
.then(()=>{
  console.log('Database connecton is successful')  
})
.catch((err)=>{
    console.log(`Unable to connect to datbase${err}`)
})