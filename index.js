const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const cookieParser = require('cookie-parser')
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionalSuccessStatus: 200,
}



app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())













app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})