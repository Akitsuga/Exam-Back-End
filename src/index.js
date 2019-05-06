const express = require('express')

const movie = require('./routers/movie')
const category = require('./routers/category')
const connection = require('./routers/connection')


const app = express()
const port = 2010

app.use(express.json())

app.use(movie)
app.use(category)
app.use(connection)

app.listen(port, (err) => {
    if(err) console.log("Failed Connect to Server");
    console.log("Running at ", port);
})