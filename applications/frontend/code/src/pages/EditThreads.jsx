import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 

const EditThreads = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [errorMessages, setErrorMessages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:8080/edit-threads/${id}`);
        if (!response.ok) throw new Error('Failed to fetch thread data');
        setFormData(await response.json());
      } catch (err) {
        setError(err.message);
      }
    };
    fetchThread();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/edit-threads/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/threads');
      } else {
        setErrorMessages(result.errors || [result.message]);
      }
    } catch {
      setErrorMessages(['An unexpected error occurred.']);
    }
  };

  return (
    <div className="main">
      <h1>Edit the thread</h1>
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((msg, index) => (
            <p key={index} className="error">{msg}</p>
          ))}
        </div>
      )}
      {error ? <p>Error loading thread: {error}</p> : (
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" placeholder="Enter thread title" value={formData.title} onChange={handleChange} required />
          <label>Thread Content</label>
          <textarea name="content" placeholder="Enter thread content" value={formData.content} onChange={handleChange} required />
          <button type="submit">Update the Thread</button>
        </form>
      )}
    </div>
  );
};

export default EditThreads;
