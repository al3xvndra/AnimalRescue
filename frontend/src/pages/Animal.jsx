import { useParams } from "react-router-dom";
import { reports } from "../../data";

const Animal = () => {
  const { id } = useParams(); // Extract 'id' from the route parameter
  const animal = reports.find((reports) => reports.id === parseInt(id));

  if (!animal) {
    return <p>Blogpost not found.</p>;
  }

  return (
    <div className="main">
      <h1>{animal.category}</h1>
      <p>{animal.pickup}</p> {/* Assuming content field */}
    </div>
  );
};

export default Animal;
