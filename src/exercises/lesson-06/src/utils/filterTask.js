export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'pending':
      return tasks.filter((task) => !task.completed);
    case 'all':
    default:
      return tasks;
  }
}
