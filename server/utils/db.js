const mongoose = require("mongoose")

const dbConnect = async() => {
    try {
        return await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    } catch (err) {
        //console.log(err)
        process.exit(1)
    }
}
 
module.exports = dbConnect