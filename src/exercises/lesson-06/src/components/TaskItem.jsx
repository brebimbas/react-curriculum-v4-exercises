export default function TaskItem({ task }) {
  const { title, completed } = task;

  return (
    <li className="task-item">
      <span className="task-title">{title}</span>
      <span className="task-status">{completed ? '✅' : '⏳'}</span>
    </li>
  );
}
