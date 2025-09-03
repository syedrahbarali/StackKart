const jwt = require("jsonwebtoken");

const adminAuthentication = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (user._id && user.isAdmin) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = adminAuthentication;
