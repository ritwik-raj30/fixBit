import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-10 text-white flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Logo" className="h-16" />
        <span className="text-2xl font-bold">Fix Bit</span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:underline"
        >
          Home
        </ScrollLink>
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:underline"
        >
          About Team
        </ScrollLink>
        <ScrollLink
          to="contact"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:underline"
        >
          <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200">
            Contact
          </button>
        </ScrollLink>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:underline"
            onClick={toggleMenu}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:underline"
            onClick={toggleMenu}
          >
            About Team
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:underline"
            onClick={toggleMenu}
          >
            <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200">
              Contact
            </button>
          </ScrollLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
