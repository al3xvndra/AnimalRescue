import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const CreateThreads = () => {
  const [formData, setFormData] = useState({
    authorId: '',
    title: '',
    content: ''
  });
  const [errorMessages, setErrorMessages] = useState([]); 
  const navigate = useNavigate(); 

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:8080/create-threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/threads'); // Redirect user to /threads page after success
      } else {
        setErrorMessages(result.errors || [result.message]); // Set error messages
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessages(['An unexpected error occurred.']); // General error message
    }
  };

  return (
    <div className="main">
      <h1>Create a thread</h1>
      <h2>Welcome</h2>

      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
        </div>
      )}

      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Author ID</label>
          <input type="number" name="authorId" placeholder="Author ID" value={formData.authorId} onChange={handleChange} required />

          <label>Title</label>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

          <label>Thread</label>
          <textarea className="long" name="content" value={formData.content} onChange={handleChange} required />

          <button type="submit">Post the Thread</button>
        </form>
      </div>
    </div>
  );
};

export default CreateThreads;
