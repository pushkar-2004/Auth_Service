const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing",
    });
  }
  next();
};

const validateIsAdminReq = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "user id missing",
    });
  }
  next();
};

module.exports = { validateUserAuth, validateIsAdminReq };
