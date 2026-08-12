export default function UserProfile({ name, title = 'Student' }) {
  return (
    <div>
      <h2>Welcome, {name || title}</h2>
    </div>
  );
}
