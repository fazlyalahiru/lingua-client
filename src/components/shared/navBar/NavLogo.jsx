import { Link } from "react-router-dom";
import logo from '../../../../public/images/Lingua.png'

const NavLogo = () => {
  return (
    <Link to="/">
      <img
        className=" md:block"
        src={logo}
        alt="logo"
        width="160"
        height="100"
      />
    </Link>
  );
};

export default NavLogo;
