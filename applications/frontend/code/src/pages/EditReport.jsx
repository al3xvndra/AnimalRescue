import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 

const EditReport = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({ animal: '', pickup: '', dropoff: '', color: '', animalStatus: '', authorId: '', message: '' });
  const [errorMessages, setErrorMessages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`http://localhost:8080/edit-report/${id}`);
        if (!response.ok) throw new Error('Failed to fetch report data');
        setFormData(await response.json());
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReport();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/edit-report/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/reports');
      } else {
        setErrorMessages(result.errors || [result.message]);
      }
    } catch {
      setErrorMessages(['An unexpected error occurred.']);
    }
  };

  return (
    <div className="main">
      <h1>Edit Report</h1>
      <h2>Welcome</h2>

      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
        </div>
      )}

      {error ? <p>Error loading report: {error}</p> : (
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

            <button type="submit">Update Report</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditReport;
