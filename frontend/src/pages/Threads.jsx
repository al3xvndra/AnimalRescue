import { accounts } from "../../data.js";

const Thread = () => {
  return (
    <div>
      <h1>Threads Page</h1>

      {accounts.length === 0 ? (
        <p>There are no accounts.</p>
      ) : (
        <div>
          <p>Here are the accounts:</p>
          {accounts.map((account) => (
            <p key={account.id}>
              {account.name}
              {account.lastname}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;
