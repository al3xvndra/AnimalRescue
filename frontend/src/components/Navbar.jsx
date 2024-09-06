import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navBar">
        <div className="logo"></div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/lostfound"}>LostFound</Link>
          </li>
          <li>
            <Link to={"/thread"}>Thread</Link>
          </li>
        </ul>
        <div className="navButtons">
          <button id="logIn">
            <Link to={"/login"}>Log in</Link>
          </button>
          <button id="signUp">
            <Link to={"/signup"}>Sign up</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
