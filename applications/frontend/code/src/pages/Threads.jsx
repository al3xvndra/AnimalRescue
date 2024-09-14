import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Thread = () => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchThreads = async () => {
      try {
        const response = await fetch("http://localhost:8080/threads"); // Adjust URL if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchThreads();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="main">
      <h1>Threads Page</h1>

      {threads.length === 0 ? (
        <p>There are no threadposts.</p>
      ) : (
        <div>
          <p>Here are the threadposts:</p>
          {threads.map((thread) => (
            <Link key={thread.id} to={`/threads/${thread.id}`}>
              <p>
                {thread.authorId} - {thread.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;
