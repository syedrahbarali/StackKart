const crypto = require("crypto-js");

const generateKey = () => {
    const key = crypto.SHA256().toString()
    console.log(key)
}

generateKey()