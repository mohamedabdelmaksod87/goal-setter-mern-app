const check = require("express-validator").check;

class Validation {
  static async goalValidation(req, res, next) {
    await check("goal")
      .exists()
      .withMessage(`Goal field is required`)
      .isString()
      .withMessage(`Goal field must be string`)
      .trim()
      .not()
      .isEmpty()
      .withMessage(`Goal field must not be empty`)
      .escape()
      .run(req);
    next();
  }

  static async chkEmail(req) {
    return check("email")
      .exists()
      .withMessage(`Email field is required`)
      .isString()
      .withMessage(`Email field must be string`)
      .trim()
      .isEmail()
      .withMessage("Invalid Email address")
      .isLength({ max: 100 })
      .withMessage("Email must be 100 characters at most")
      .run(req);
  }

  static async chkPassword(req) {
    return check("password")
      .exists()
      .withMessage(`Password field is required`)
      .isString()
      .withMessage(`Password field must be string`)
      .trim()
      .isLength({ min: 3 })
      .withMessage("Password must be 3 characters at least")
      .isLength({ max: 20 })
      .withMessage("Password must be 20 characters at most")
      .not()
      .contains(" ")
      .withMessage("White spaces are not allowed")
      .escape()
      .run(req);
  }

  static async loginValidation(req, res, next) {
    const emailCheck = Validation.chkEmail(req);
    const passwordCheck = Validation.chkPassword(req);
    await Promise.all([emailCheck, passwordCheck]);
    next();
  }

  static async registerValidation(req, res, next) {
    const emailCheck = Validation.chkEmail(req);
    const passwordCheck = Validation.chkPassword(req);
    const nameCheck = check("name")
      .exists()
      .withMessage(`Name field is required`)
      .isString()
      .withMessage(`Name field must be string`)
      .trim()
      .not()
      .isEmpty()
      .withMessage(`Name field must not be empty`)
      .isLength({ max: 30 })
      .withMessage("Name must be 30 characters at most")
      .escape()
      .run(req);

    await Promise.all([nameCheck, emailCheck, passwordCheck]);
    next();
  }
}

module.exports = Validation;
