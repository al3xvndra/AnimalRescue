import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Animal = () => {
  const { id } = useParams(); // Extract 'id' from the route parameter
  const location = useLocation(); // Access location state to get passed data

  // Get the report from the location state if it exists, else null
  const initialAnimal = location.state?.report || null;

  const [animal, setAnimal] = useState(initialAnimal);
  const [error, setError] = useState(null);

  // Fetch animal data only if it's not provided by the location state
  useEffect(() => {
    if (!animal) {
      const fetchAnimal = async () => {
        try {
          const response = await fetch(`http://localhost:8080/reports/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setAnimal(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchAnimal();
    }
  }, [id, animal]);

  if (error) return <p>Error: {error}</p>;
  if (!animal) return <p>Animal not found.</p>;

  return (
    <div className="main">
      <h1>{animal.animal}</h1>
      <p>{animal.pickup}</p>
      <p>{animal.dropoff}</p>
    </div>
  );
};

export default Animal;
