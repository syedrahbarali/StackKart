const jwt = require("jsonwebtoken");

const generateAccessToken = (password) => {
    return jwt.sign(password, `${process.env.ACCESS_TOKEN_SECRET}`);
}

module.exports = generateAccessToken