const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // fixed . to ,

    const foundUser = await User.findByPk(decoded.id);

    if (!foundUser) {
      return res.status(403).json({
        message: "Access denied: User not found",
      });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};


module.exports = {authenticate};
