const bcrypt = require("bcryptjs");

const generateAccessToken = (password) => {
    return bcrypt.hashSync(password,10,(err,hash) => {
        if(err) {
            console.log("Hashing error",err)
            return;
        }

        console.log("Hashed password",hash)
    })
}

module.exports = generateAccessToken