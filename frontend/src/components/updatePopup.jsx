import { useState } from "react";
import Spinner from "./spinner";
import { toast } from "react-toastify";
import goalsService from "../goalsServices";

export default function UpdatePopup(props) {
  const { togglePopup, userGoals, setUserGoals, targetGoal, token } = props;
  const [newGoal, setNewGoal] = useState(userGoals[targetGoal].text);
  const [loading, setLoading] = useState(false);
  const [validationErr, setvalidationErr] = useState({});

  const onSubmit = async (eve) => {
    let errors = {};
    try {
      eve.preventDefault();
      setLoading(true);
      await goalsService.updateGoal(
        { goal: newGoal },
        userGoals[targetGoal]._id,
        token
      );
      setLoading(false);
      setNewGoal("");
      setvalidationErr(errors);
      togglePopup(null);
      toast.success("Goal Updated Successfully");
      let updatedGoals = [...userGoals];
      updatedGoals[targetGoal].text = newGoal;
      setUserGoals(updatedGoals);
    } catch (err) {
      setLoading(false);
      if (Array.isArray(err)) {
        for (const eachErr of err) {
          errors[eachErr.param] = eachErr.msg;
        }
      } else {
        toast.error(err.msg);
      }
      setvalidationErr(errors);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={() => togglePopup(null)}>
          x
        </button>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={newGoal}
                placeholder="Enter your Goal"
                onChange={(e) => setNewGoal(e.target.value)}
                required
              />
              {validationErr.goal && (
                <h4 className="error">{validationErr.goal}</h4>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Update Goal
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
