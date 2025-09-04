const SignUp = () => {
  return (
    <div className="main">
      <h1>Sign Up Page</h1>
      <div className="form">
        <form>
          <input className="textInput" type="text" placeholder="username"></input>
          <input className="textInput" type="password" placeholder="password"></input>
          <button className="button" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
