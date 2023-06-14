import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  return (
    <div className=" bg-gray-800 dark:bg-[#013367]">
      <Container>
        <div className=" grid md:grid-cols-5 py-10   text-gray-300 border-b border-gray-800 ">
          <div className="pr-3  pt-4 border-l-2 border-[#4285f4] ps-4">
            <h1 className="text-xl md:text-2xl font-bold  uppercase">
              Lingua <sup>®</sup>
            </h1>
            <p className="py-2">
              Lingua is a Language learning platform for teens. We have wide
              collection on language learning classes with extreamly skilled
              instructors
            </p>
          </div>
          <div className="px-5 md:px-5 pt-4">
            <h1 className="font-bold uppercase">Company</h1>
            <ul className="py-2 ">
              <li className="hover:text-[#4285f4]">About us</li>
              <li className="py-2 hover:text-[#4285f4]">Work with us</li>
              <li className="hover:text-[#4285f4]">Latest updates</li>
              <li className="py-2 hover:text-[#4285f4]">Case Studies</li>
            </ul>
          </div>
          <div className="px-5 md:px-3 pt-4">
            <h1 className="font-bold uppercase">Quick Links</h1>
            <ul className="py-2 ">
              <Link to="/register">
                <p className="hover:text-[#4285f4]">Registration</p>
              </Link>
              <Link to="/instructors" >
                <p className="py-2 hover:text-[#4285f4]">Top Instructors</p>
              </Link>
              <Link to="/classes">
                <p className="hover:text-[#4285f4]">Top Classes</p>
              </Link>
              <Link to="/dashboard">
                <p className="py-2 hover:text-[#4285f4]">Dashboard</p>
              </Link>
            </ul>
          </div>
          <div className="px-5 md:px-3 pt-4">
            <h1 className="font-bold uppercase">Support</h1>
            <ul className="py-2">
              <li className="hover:text-[#4285f4]">Contact us</li>
              <li className="py-2 hover:text-[#4285f4]">Sales</li>
              <li className="hover:text-[#4285f4]">Become a partner</li>
              <li className="py-2 hover:text-[#4285f4]">Business deal</li>
            </ul>
          </div>
          <div className="px-5 md:px-3 pt-4 ">
            <h1 className="font-bold uppercase">Contact</h1>
            <ul className="py-2">
              <li >1/12, South Jatrabari, Dhaka</li>
              <li >+8801303359120</li>
              <li>+fazlyalahi.ru@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="text-gray-400 text-xs text-center md:flex md:justify-between my-container py-4">
          <p className=" ">@2023 Lingua. All Rights Reserved</p>
          <p>Powered by Fazly Alahi</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
