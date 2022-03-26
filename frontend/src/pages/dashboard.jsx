import { useState, useEffect } from "react";
import GoalForm from "../components/goalForm";
import goalsService from "../goalsServices";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import GoalItem from "../components/goalItem";

export default function Dashboard(props) {
  const { user } = props;
  const { token, name } = user;
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchUserGoals = async () => {
        try {
          setLoading(true);
          const goals = await goalsService.getGoals(token);
          setLoading(false);
          setUserGoals(goals);
        } catch (err) {
          setLoading(false);
          toast.error(err.msg);
        }
      };
      fetchUserGoals();
    } else {
      setUserGoals([]);
    }
  }, [token]);

  //Delete Goal Logic

  const deleteGoal = async (goalId) => {
    try {
      setLoading(true);
      await goalsService.deleteGoal(goalId, token);
      setLoading(false);
      const newUserGoals = userGoals.filter((goal) => {
        return goal._id !== goalId;
      });
      setUserGoals(newUserGoals);
      toast.success("Goal Deleted Successfully");
    } catch (err) {
      setLoading(false);
      toast.error(err.msg);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {user ? (
        <>
          <section className="heading">
            <h4>
              Welcome {name.charAt(0).toUpperCase() + name.slice(1)}, Start
              Setting Your Goals
            </h4>
          </section>
          <GoalForm
            token={token}
            userGoals={userGoals}
            setUserGoals={setUserGoals}
          />
          <section className="content">
            {userGoals.length > 0 ? (
              <div className="goals">
                {userGoals.map((goal) => (
                  <GoalItem
                    key={goal._id}
                    goal={goal}
                    deleteGoal={deleteGoal}
                  />
                ))}
              </div>
            ) : (
              <h3>You have not set any goals</h3>
            )}
          </section>
        </>
      ) : (
        <h2>Please Login or Register to Start Setting Goals</h2>
      )}
    </>
  );
}
