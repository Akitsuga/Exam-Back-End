const express = require('express')
const userRouter = require('./routers/userRouter')


const app = express()
const port = 2010

app.use(express.json())
app.use(userRouter)
//### conn pindah ke connection.js
//### Register & verify moved to userRouter.js

app.listen(port, (err) => {
    if(err) console.log("Failed Connect to Server");
    console.log("Running at ", port);
})