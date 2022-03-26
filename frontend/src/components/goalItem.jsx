export default function GoalItem(props) {
  const { goal, deleteGoal } = props;
  return (
    <div className="goal">
      <h2>{goal.text}</h2>
      <button onClick={() => deleteGoal(goal._id)} className="close">
        X
      </button>
    </div>
  );
}
