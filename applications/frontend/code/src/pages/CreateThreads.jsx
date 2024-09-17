import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateThreads = () => {
  const [formData, setFormData] = useState({
    authorId: '',
    title: '',
    content: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

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
        alert('Thread posted successfully');
        navigate('/threads'); // Redirect user to /threads page after success
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="main">
      <h1>Create a thread</h1>
      <h2>welcome</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>authorId</label>
          <input type="text" name="authorId" placeholder="authorId" value={formData.authorId} onChange={handleChange} required />

          <label>title</label>
          <input type="text" name="title" placeholder="title" value={formData.title} onChange={handleChange} required />

          <label>thread</label>
          <input type="text" name="content" placeholder="content" value={formData.content} onChange={handleChange} required />

          <button type="submit">Post the Thread</button>
        </form>
      </div>
    </div>
  );
};

export default CreateThreads;
