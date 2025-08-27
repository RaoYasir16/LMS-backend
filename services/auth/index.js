const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODE, TEXTS } = require("../../config/constant");



// Register
const register = asyncErrorHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        message: TEXTS.ALL_FIELD_ERROR,
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(STATUS_CODE.CONFLICT).json({
        message: TEXTS.CONFLICT,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
});


// Login
const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: TEXTS.ALL_FIELD_ERROR,
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: "Email not register",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: TEXTS.INVALID_CREDENTIALS,
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(STATUS_CODE.SUCCESS).json({
    token,
  });
});

module.exports = { register, login };
