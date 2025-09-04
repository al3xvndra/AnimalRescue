const LogIn = () => {
  return (
    <div className="main">
      <h1>Log In Page</h1>
      <div className="form">
        <form>
          <input className="textInput" type="text" placeholder="username"></input>
          <input className="textInput" type="password" placeholder="password"></input>
          <button className="button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
