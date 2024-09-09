import { Link } from "react-router-dom";
import { threadposts } from "../../data.js";

const Thread = () => {
  return (
    <div className="main">
      <h1>Threads Page</h1>

      {threadposts.length === 0 ? (
        <p>There are no threadposts.</p>
      ) : (
        <div>
          <p>Here are the threadposts:</p>
          {threadposts.map((threadpost) => (
            <Link key={threadpost.id} to={`/thread/${threadpost.id}`}>
              <p>
                {threadpost.authorId}
                {threadpost.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;
