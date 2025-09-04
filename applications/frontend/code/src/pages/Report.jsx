import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Report = () => {
  const [formData, setFormData] = useState({
    animal: '',
    pickup: '',
    dropoff: '',
    color: '',
    animalStatus: '',
    authorId: '',
    message: ''
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
      const response = await fetch('http://localhost:8080/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/reports');
      } else {
        setErrorMessages(result.errors || [result.message]);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessages(['An unexpected error occurred.']);
    }
  };

  return (
    <div className="main">
      <h1>Report Page</h1>
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
          <label>Animal</label>
          <input type="text" name="animal" placeholder="Animal" value={formData.animal} onChange={handleChange} required />

          <label>Pick up</label>
          <input type="text" name="pickup" placeholder="Pick Up" value={formData.pickup} onChange={handleChange} required />

          <label>Drop off</label>
          <input type="text" name="dropoff" placeholder="Drop Off" value={formData.dropoff} onChange={handleChange} required />

          <label>Color</label>
          <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />

          <label>Status</label>
          <input type="text" name="animalStatus" placeholder="Animal Status" value={formData.animalStatus} onChange={handleChange} required />

          <label>Author</label>
          <input type="number" name="authorId" placeholder="Author ID" value={formData.authorId} onChange={handleChange} required />

          <label>Message</label>
          <textarea className="long" name="message" value={formData.message} onChange={handleChange} required />

          <button type="submit">Report</button>
        </form>
      </div>
    </div>
  );
};

export default Report;
