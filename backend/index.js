const express = require('express')
const app = express()
const RoutesUser = require('./routes')


app.use('/users',RoutesUser)

app.listen(8000,()=>{
    console.log('server is running')
})