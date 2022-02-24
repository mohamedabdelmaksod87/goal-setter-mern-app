const validationResult = require("express-validator").validationResult;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/users");

class UserController {
  static async registerUser(req, res) {
    const { name, email, password } = req.body;
    if (validationResult(req).isEmpty()) {
      try {
        //1- check if user exists
        const userExits = await UserModel.checkEmail(email);
        if (userExits) {
          return res
            .status(400)
            .json({ msg: `User already exists, Please Login` });
        }
        //2- hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //3- create user
        const userResponse = await UserModel.createUser(
          name,
          email,
          hashedPassword
        );
        if (userResponse.insertedId && userResponse.acknowledged) {
          // 201 status means Ok & something was created
          res.status(201).json({
            user: userResponse,
            msg: `user created successfully`,
            token: UserController.generateToken(userResponse.insertedId),
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `somthing went wrong` });
      }
    } else {
      res.status(400).json(validationResult(req).array());
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    if (validationResult(req).isEmpty()) {
      try {
        //1- match email
        const user = await UserModel.checkEmail(email);
        if (!user) {
          return res.status(400).json({ msg: `Email address is not correct` });
        }
        //2- match password
        (await bcrypt.compare(password, user.password))
          ? res.status(200).json({
              msg: `Welcome ${user.name}`,
              data: user,
              token: UserController.generateToken(user._id),
            })
          : res.status(400).json({ msg: `Password is not correct` });
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `somthing went wrong` });
      }
    } else {
      res.status(400).json(validationResult(req).array());
    }
  }

  static async userData(req, res) {
    console.log(req.userId);
    res.status(200).json({ message: `display user data` });
  }

  static generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }
}

module.exports = UserController;
