const express = require('express')
const colors = require('colors')
require('dotenv').config()

const connectDB = require('./config/db')
const port = process.env.PORT || 8000

let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

connectDB()

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/recipe', require('./routes/recipes'))

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan.underline)
})