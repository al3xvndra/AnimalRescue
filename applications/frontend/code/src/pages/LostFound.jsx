import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LostFound = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:8080/reports");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReports();
  }, []);
  
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main">
      <h1>Lost and Found Page</h1>
      <h2>Welcome</h2>
      {reports.length === 0 ? (
        <p>There are no reports.</p>
      ) : (
        <div>
          <p>Here are the reports:</p>
          {reports.map((report) => (
            <Link key={report.id} to={`/report/${report.id}`}>
              <p>
                {report.status} - {report.animal}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostFound;
