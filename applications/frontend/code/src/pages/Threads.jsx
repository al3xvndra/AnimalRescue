import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchThreads = async () => {
      try {
        const response = await fetch("http://localhost:8080/threads");
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

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main">
      <h1>Threads Page</h1>
      <button className="actionButton"><Link to={"/create-thread"}>Create a thread</Link></button>
      {threads.length === 0 ? (
        <p>There are no threads.</p>
      ) : (
        <div>
          <p>Here are the threadposts:</p>
          {threads.map((thread) => (
            <div key={thread.id}>
              <Link key={thread.id} to={`/thread/${thread.id}`} state={{ thread }}>
              <p>
                {thread.id} - {thread.title}
              </p>
            </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Threads;
