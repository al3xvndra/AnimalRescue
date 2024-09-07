import { reports } from "../../data.js";
import { Link } from "react-router-dom";

const LostFound = () => {
  return (
    <div className="main">
      <h1>Lost and Found Page</h1>
      <h2>welcome</h2>
      {reports.length === 0 ? (
        <p>There are no accounts.</p>
      ) : (
        <div>
          <p>Here are the accounts:</p>
          {reports.map((report) => (
            <Link key={report.id} to={`/reports/${report.id}`}>
              <p>
                {report.category}
                {report.color}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostFound;
