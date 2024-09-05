import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/lostfound"}>LostFound</Link>
    </div>
  );
};

export default Navbar;
