import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Thread = () => {
  const { id } = useParams(); // Extract 'id' from the route parameter
  const [thread, setThread] = useState(null);
  const [threadComments, setThreadComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the thread details
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:8080/threads/${id}`); // Adjust URL if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setThread(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch comments for the thread
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comments?threadId=${id}`); // Adjust URL if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setThreadComments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchThread();
    fetchComments();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!thread) {
    return <p>Threadpost not found.</p>;
  }

  return (
    <div className="main">
      <h1>{thread.title}</h1>
      <p>{thread.content}</p>

      <h2>Comments</h2>
      {threadComments.length > 0 ? (
        <ul>
          {threadComments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.commenterName}</strong>: {comment.comment}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Thread;
