const mongoose = require('mongoose')

// const DB = "mongodb+srv://hassan:hassan@cluster0.tta7ad9.mongodb.net/e-commerce"

mongoose.connect(process.env.MONGODB_KEY).then(
    () => {
        console.log('database connected successfully'.green.bold);
    }
).catch(
    (err) => {
        console.log("detabase not connected", err)
    }
)