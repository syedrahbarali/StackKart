const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token || req?.headers?.authorization?.split(" ");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing!" });
    }

    const user = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    console.log(user)
    if (user._id) {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = authentication;
