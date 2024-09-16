import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Thread = () => {
  const { id } = useParams(); // Extract 'id' from the route parameter (this is the threadId)

  const [formData, setFormData] = useState({
    comment: '',
    commenterId: '',
    commenterName: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const commentData = { ...formData, threadId: id }; // Include threadId
  
      const response = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Comment submitted successfully');
        setFormData({ comment: '', commenterId: '' }); // Clear form
  
        // Directly add the new comment to the state without re-fetching
        setThreadComments([...threadComments, { id: result.id, commenterName: formData.commenterName, comment: formData.comment }]);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };
  

  const [thread, setThread] = useState(null);
  const [threadComments, setThreadComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the thread details
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:8080/threads/${id}`); // Fetch thread by id
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
        const response = await fetch(`http://localhost:8080/comments?threadId=${id}`); // Fetch comments by threadId
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
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="commenterName" placeholder="Name" value={formData.commenterName} onChange={handleChange} required />

        <label>Comment</label>
        <input type="text" name="comment" placeholder="Comment" value={formData.comment} onChange={handleChange} required />

        <label>Author</label>
        <input type="number" name="commenterId" placeholder="ID" value={formData.commenterId} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Thread;
