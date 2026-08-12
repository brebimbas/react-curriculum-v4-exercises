import { useEffect, useState, useMemo } from 'react';
import UserProfile from './src/components/UserProfile';
import TaskFilter from './src/components/TaskFilter';
import TaskItem from './src/components/TaskItem';

export default function StudentWork() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTasks([
        { id: 1, title: 'Learn React', completed: true },
        { id: 2, title: 'Refactor code', completed: false },
        { id: 3, title: 'Organize files', completed: false },
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="student-work">
      <UserProfile name="Student" />

      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      <ul className="task-list">
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
