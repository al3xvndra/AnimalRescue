import { useState } from 'react';

const Report = () => {
  // Define state to capture form data
  const [formData, setFormData] = useState({
    animal: '',
    pickup: '',
    dropoff: '',
    color: '',
    status: '',
    authorId: '',
    message: ''
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
      const response = await fetch('http://localhost:8080/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Report submitted successfully');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="main">
      <h1>Report Page</h1>
      <h2>welcome</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Animal</label>
          <input type="text" name="animal" placeholder="Category" value={formData.animal} onChange={handleChange} required />

          <label>Pick up</label>
          <input type="text" name="pickup" placeholder="Pick Up" value={formData.pickup} onChange={handleChange} required />

          <label>Drop off</label>
          <input type="text" name="dropoff" placeholder="Drop Off" value={formData.dropoff} onChange={handleChange} required />

          <label>Color</label>
          <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />

          <label>Status</label>
          <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />

          <label>Author</label>
          <input type="number" name="authorId" placeholder="AuthorID" value={formData.authorId} onChange={handleChange} required />

          <label>Message</label>
          <input type="text" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />

          <button type="submit">Report</button>
        </form>
      </div>
    </div>
  );
};

export default Report;
