import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Thread = () => {
  const { id } = useParams();
  const location = useLocation();

  // Check if thread data was passed from the previous page
  const initialThread = location.state?.thread || null;

  const [thread, setThread] = useState(initialThread);
  const [threadComments, setThreadComments] = useState([]);
  const [formData, setFormData] = useState({
    comment: '',
    commenterId: '',
    commenterName: ''
  });
  const [error, setError] = useState(null);

  // Fetch thread data if not available from location.state
  useEffect(() => {
    if (!thread) {
      const fetchThread = async () => {
        try {
          const response = await fetch(`http://localhost:8080/threads/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setThread(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchThread();
    }

    // Fetch comments for the thread
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comments?threadId=${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setThreadComments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComments();
  }, [id, thread]);

  // Handle input change for the comment form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding a comment
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const commentData = { ...formData, threadId: id }; // Include threadId with the comment
  
      const response = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Add the new comment to the existing comments without re-fetching
        setThreadComments([...threadComments, { 
          id: result.id, 
          commenterName: formData.commenterName, 
          comment: formData.comment 
        }]);

        // Clear the form fields after successful submission
        setFormData({
          comment: '',
          commenterId: '',
          commenterName: ''
        });
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!thread) {
    return <p>Loading thread...</p>; // Show loading message if data is not yet available
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

      {/* Comment submission form */}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          name="commenterName" 
          placeholder="Name" 
          value={formData.commenterName} 
          onChange={handleChange} 
          required 
        />

        <label>Comment</label>
        <input 
          type="text" 
          name="comment" 
          placeholder="Comment" 
          value={formData.comment} 
          onChange={handleChange} 
          required 
        />

        <label>Author ID</label>
        <input 
          type="number" 
          name="commenterId" 
          placeholder="ID" 
          value={formData.commenterId} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Thread;
