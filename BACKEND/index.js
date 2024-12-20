const connectToMongo = require('./db');
const express = require('express')
const cors=require( 'cors' )

connectToMongo();
const app = express()
app.use(cors())
const port = 3001

app.use(express.json())

//available routes

app.use('/api/auth',require('./routes/auth'))

app.use('/api/stuffs',require('./routes/stuffs'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
