const GoalsModel = require("../models/goals");
const validationResult = require("express-validator").validationResult;

class GoalsController {
  static async getGoals(req, res) {
    try {
      const getResponse = await GoalsModel.getUserGoals(req.userId);
      if (getResponse.length > 0) {
        res.status(200).json(getResponse);
      } else {
        res.status(200).json({ message: `No Goals Exist` });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: `Something went wrong, please try again` });
    }
  }

  static async setGoal(req, res) {
    if (validationResult(req).isEmpty()) {
      try {
        const setResponse = await GoalsModel.setUserGoal(
          req.body.goal,
          req.userId
        );
        if (setResponse.insertedId && setResponse.acknowledged) {
          res.status(201).json(setResponse);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: `Something went wrong, Goal couldn't be added`,
        });
      }
    } else {
      res.status(400).json(validationResult(req).array());
    }
  }

  static async updateGoal(req, res) {
    if (validationResult(req).isEmpty()) {
      try {
        const updateResponse = await GoalsModel.updateUserGoal(
          req.params.id,
          req.body.goal,
          req.userId
        );
        if (updateResponse.matchedCount === 1) {
          res.status(200).json({ status: "Goal updated successfully" });
        } else if (updateResponse.matchedCount === 0) {
          res.status(400).json({ error: "Goal was not found" });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({
          error: "Something went wrong, Goal couldn't be updated",
        });
      }
    } else {
      res.status(400).json(validationResult(req).array());
    }
  }

  static async deleteGoal(req, res) {
    try {
      const deleteResponse = await GoalsModel.deleteUserGoal(
        req.params.id,
        req.userId
      );
      if (deleteResponse.deletedCount === 1) {
        res
          .status(200)
          .json({ status: "Goal deleted successfully", id: req.params.id });
      } else if (deleteResponse.deletedCount === 0) {
        res.status(400).json({ error: "Goal was not found" });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ error: "Something went wrong, Goal couldn't be deleted" });
    }
  }
}

module.exports = GoalsController;
