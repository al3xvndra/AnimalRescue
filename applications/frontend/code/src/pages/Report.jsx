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
          <input className="textInput" type="text" name="animal" placeholder="What type of animal is it?" value={formData.animal} onChange={handleChange} required />

          <label>Location</label>
          <input className="textInput" type="text" name="pickup" placeholder="Where was the animal found/lost?" value={formData.pickup} onChange={handleChange} required />

          <label>Latest location</label>
          <input className="textInput" type="text" name="dropoff" placeholder="Where is the animal now?" value={formData.dropoff} onChange={handleChange} required />

          <label>Appearance</label>
          <input className="textInput" type="text" name="color" placeholder="Breed, color, size, etc." value={formData.color} onChange={handleChange} required />

          <label>Status</label>
<div className="status-options">
  <label>
    <input
      type="radio"
      name="animalStatus"
      value="found"
      style={{ padding: '5px'}}
      checked={formData.animalStatus === "found"}
      onChange={handleChange}
      required
    />
    Found
  </label>

  <label>
    <input
      type="radio"
      name="animalStatus"
      value="lost"
      style={{ marginLeft: '15px', padding: '5px'}}
      checked={formData.animalStatus === "lost"}
      onChange={handleChange}
      required
    />
    Lost
  </label>
</div>

          <label>Author</label>
          <input className="textInput" type="number" name="authorId" placeholder="Author ID" value={formData.authorId} onChange={handleChange} required />

          <label>Message</label>
          <textarea className="textEdit" name="message" value={formData.message} onChange={handleChange} required />

          <button className="button" type="submit">Report</button>
        </form>
      </div>
    </div>
  );
};

export default Report;
