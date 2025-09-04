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
      <h4>Join the conversation! Our community threads are a space to:</h4>
      <ul>
        <li>Share updates on lost and found animals.</li>
        <li>Offer tips for searching or caring for pets in need.</li>
        <li>Connect with others who care as much about animals as you do.</li>
        <li>Together, we make a stronger network for pets and their people.</li>
        </ul>
        <br></br>
      <button className="actionButton"><Link to={"/create-thread"}>Create a thread</Link></button>
      <br></br>
      {threads.length === 0 ? (
        <p>There are no threads.</p>
      ) : (
        <div>
          <p>Here are the threadposts:</p>
          <br></br>
          {threads.map((thread) => (
            <div key={thread.id}>
              <Link key={thread.id} to={`/thread/${thread.id}`} state={{ thread }} className="repThread">
              
                {thread.title}
              
            </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Threads;
