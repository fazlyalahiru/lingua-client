import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.png'

const NavLogo = () => {
  return (
    <Link to="/">
      <img
        className=" md:block"
        src={logo}
        alt="logo"
        width="100"
        height="100"
      />
    </Link>
  );
};

export default NavLogo;
