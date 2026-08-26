import { useState } from 'react';
import { getSinglePost } from './api';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setLoading(true);
    setError(null);

    getSinglePost(1)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Get post'}
      </button>
      <div className="content">
        {error && <p className="error">ErrorL {error}</p>}
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}
