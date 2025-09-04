import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Thread = () => {
  const { id } = useParams();
  const location = useLocation();

  const initialThread = location.state?.thread || null;

  const [thread, setThread] = useState(initialThread);
  const [threadComments, setThreadComments] = useState([]);
  const [formData, setFormData] = useState({
    comment: '',
    commenterId: '',
    commenterName: ''
  });
  const [error, setError] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!thread) {
      const fetchThread = async () => {
        try {
          const response = await fetch(`http://localhost:8080/thread/${id}`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages([]); // Clear comment errors on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const commentData = { ...formData, threadId: id };

      const response = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      const result = await response.json();

      if (response.ok) {
        setThreadComments([...threadComments, { 
          id: result.commentId, 
          commenterName: formData.commenterName, 
          comment: formData.comment 
        }]);

        setFormData({
          comment: '',
          commenterId: '',
          commenterName: ''
        });
      } else {
        setErrorMessages(result.errors || [result.message]); // Set comment-related error messages
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessages(['An unexpected error occurred while submitting the comment.']); // Set a generic error message
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this thread?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/delete-thread/${id}`, {
          method: 'POST',
        });
        if (response.ok) {
          navigate('/threads');
        } else {
          const result = await response.json();
          alert('Error: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting thread:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/comments/${commentId}`, {
          method: 'POST',
        });

        if (response.ok) {
          // Update the comments state to remove the deleted comment
          setThreadComments(threadComments.filter(comment => comment.id !== commentId));
        } else {
          const result = await response.json();
          alert('Error: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="main">
      <h1>{thread.title}</h1>
      <p>{thread.content}</p>

      <form action={`/edit-thread/${id}`} method="GET">
        <button type="submit">Edit</button>
      </form>
      <button onClick={handleDelete}>Delete</button>

      <h2>Comments</h2>
      {threadComments.length > 0 ? (
        <ul>
          {threadComments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.commenterName}</strong>: {comment.comment}
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Display comment-related error messages if any */}
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((msg, index) => (
            <p key={index} className="error">{msg}</p>
          ))}
        </div>
      )}

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
        <textarea 
          className="long"
          name="comment" 
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
