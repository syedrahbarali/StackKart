const dbConnect = require('./utils/db')
const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
}));

dbConnect().then(res => {
    if(res.connection.host) {
        console.log("DB Connected Successfully at port:", res.connection.port)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }
})

module.exports = app