export default function TaskFilter({ currentFilter, onFilterChange, filters }) {
  const defaultFilters = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'pending', label: 'Pending' },
  ];

  const filterOptions = filters || defaultFilters;

  return (
    <div className="task-filter">
      {filterOptions.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          aria-pressed={currentFilter === key}
        >
          {label}
        </button>
      ))}
      <p>Current filter: {currentFilter}</p>
    </div>
  );
}
