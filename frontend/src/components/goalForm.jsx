import { useState } from "react";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import goalsService from "../goalsServices";

export default function GoalForm(props) {
  const { token, userGoals, setUserGoals } = props;
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErr, setvalidationErr] = useState({});

  const onSubmit = async (eve) => {
    let errors = {};
    try {
      eve.preventDefault();
      setLoading(true);
      const newGoal = await goalsService.createGoal({ goal: goal }, token);
      setLoading(false);
      setvalidationErr(errors);
      setGoal("");
      toast.success("Goal Added Successfully");
      setUserGoals([...userGoals, newGoal]);
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
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="goal"
            value={goal}
            placeholder="Enter your Goal"
            onChange={(e) => setGoal(e.target.value)}
          />
          {validationErr.goal && (
            <h4 className="error">{validationErr.goal}</h4>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}
