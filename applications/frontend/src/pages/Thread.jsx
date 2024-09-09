import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { threadposts, comments } from "../../data";

const Thread = () => {
  const { id } = useParams(); // Extract 'id' from the route parameter
  const [threadComments, setThreadComments] = useState([]);
  const thread = threadposts.find(
    (threadpost) => threadpost.id === parseInt(id)
  );

  useEffect(() => {
    // Filter comments related to the current threadpost
    const relatedComments = comments.filter(
      (comment) => comment.threadpostId === parseInt(id)
    );
    setThreadComments(relatedComments);
  }, [id]);

  if (!thread) {
    return <p>Threadpost not found.</p>;
  }

  return (
    <div className="main">
      <h1>{thread.title}</h1>
      <p>{thread.post}</p>

      <h2>Comments</h2>
      {threadComments.length > 0 ? (
        <ul>
          {threadComments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.commenterName}</strong>: {comment.content}
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
