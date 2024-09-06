import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav>
      <div className="navBar">
        <div className="logo"></div>
        <div className="openNav">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/lostfound"}>Lost and Found</Link>
            </li>
            <li>
              <Link to={"/thread"}>Thread</Link>
            </li>
          </ul>
          <div className="navButtonsOpen">
            <button id="logIn">
              <Link to={"/login"}>Log in</Link>
            </button>
            <button id="signUp">
              <Link to={"/signup"}>Sign up</Link>
            </button>
          </div>
        </div>
        <div className={nav ? "open" : "closed"}>
          <Link to={"/"}>Home</Link>

          <Link to={"/about"}>About</Link>

          <Link to={"/lostfound"}>Lost and Found</Link>

          <Link to={"/thread"}>Thread</Link>

          <div className="navButtonsClosed">
            <button id="logIn">
              <Link to={"/login"}>Log in</Link>
            </button>
            <button id="signUp">
              <Link to={"/signup"}>Sign up</Link>
            </button>
          </div>
        </div>
      </div>
      <div onClick={handleNav} className="hamburger">
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose />}
      </div>
    </nav>
  );
};

export default Navbar;
