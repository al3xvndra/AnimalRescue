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

  // Split reports into two categories
  const lostReports = reports.filter((report) => report.animalStatus === "lost");
  const foundReports = reports.filter((report) => report.animalStatus === "found");

  return (
    <div className="main">
      <h1>Lost and Found Page</h1>
      <h4>Browse current reports of lost and found pets in your area. See which animals are currently missing and help spread the word. Check if the pet you’ve found has already been reported missing. Every report brings us one step closer to a happy reunion.</h4>
      {reports.length === 0 ? (
        <p>There are no reports.</p>
      ) : (
        <div className="LFAnimals">
          <div>
            <h3>Lost</h3>
            {lostReports.length === 0 ? (
              <p>No lost animals reported.</p>
            ) : (
              lostReports.map((report) => (
                <Link
                  key={report.id}
                  to={`/report/${report.id}`}
                  state={{ report }}
                  className="repAnimal"
                >
                  {report.animal}
                </Link>
              ))
            )}
          </div>

          <div>
            <h3>Found</h3>
            {foundReports.length === 0 ? (
              <p>No found animals reported.</p>
            ) : (
              foundReports.map((report) => (
                <Link
                  key={report.id}
                  to={`/report/${report.id}`}
                  state={{ report }}
                  className="repAnimal"
                >
                  {report.animal}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;
