const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
const router = require("./routes")
app.use(router)
const errorMiddleware = require('./middleware/error')
app.use(errorMiddleware)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.json({
        server: "ok"
    })
})
app.get('/health', (req, res) => {
    res.json({
        server: "ok"
    })
})

const colors = require('colors');
const PORT = process.env.PORT || 5000
require('./db/db')

app.listen(PORT, () => {
    console.log(`server run at http://localhost:${PORT}`.blue.bold);
})