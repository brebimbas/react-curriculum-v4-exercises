import { useState, useMemo } from 'react';
import UserProfile from './src/components/UserProfile';
import TaskFilter from './src/components/TaskFilter';
import TaskItem from './src/components/TaskItem';
import { useTasks } from './src/hooks/useTasks';
import { filterTasks } from './src/utils/filterTask';

export default function StudentWork() {
  const [filter, setFilter] = useState('all');
  const { tasks, loading } = useTasks();

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter]
  );

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
