import React from "react";
import { Link } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import backgroundImage from "../../assets/hero.png";
import About from "./about";
import Contact from "./contactUs";
import GlobalStyle from "./globalstyle ";
import Navbar from "./nav";

const Home = () => {
  const scrollToAbout = () => {
    scroller.scrollTo("about", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const scrollToContact = () => {
    scroller.scrollTo("contact", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div
      className="flex flex-col min-h-screen overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(8,0,58,0.7),rgba(8,0,58,0.7)), url(${backgroundImage})`,
      }}
    >
      <GlobalStyle />
      <Navbar />
      <div className="pt-20">
        <div className=" flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4 sm:p-8 sm:top-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Fix <span className="text-purple-500">BIT</span>
          </h1>
          <div className="text-center bg-black bg-opacity-50 rounded-lg p-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Made for BITIANS, by BITIANS !!
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Say <span className="text-purple-500 font-bold">"Goodbye"</span>{" "}
              to the hassle of unresolved complaints and unresponsive
              management. With our innovative chat app, you can easily report
              and track issues in real-time, ensuring your concerns are
              addressed swiftly and efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg shadow-lg transition transform hover:bg-purple-500 hover:text-white hover:-translate-y-2">
                Maintenance Requests
              </div>
              <div className="bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg shadow-lg transition transform hover:bg-purple-500 hover:text-white hover:-translate-y-2">
                General Queries
              </div>
              <div className="bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg shadow-lg transition transform hover:bg-purple-500 hover:text-white hover:-translate-y-2">
                Direct Personnel Connection
              </div>
              <div className="bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg shadow-lg transition transform hover:bg-purple-500 hover:text-white hover:-translate-y-2">
                Comfortable & Stress-Free
              </div>
            </div>
            <div className="text-gray-300">
              <p className="text-lg font-bold mb-1">
                Join us in transforming the way you experience hostel living—
              </p>
              <p className="text-lg font-bold">
                <span className="text-purple-500">
                  because your comfort is our priority!
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/user-login">
              <button className="bg-[#5a67d8] text-white border-none py-4 px-8 m-2 text-[1.38rem] cursor-pointer rounded-full hover:bg-[#434190]">
                Login User
              </button>
            </Link>
            <Link to="/admin-login">
              <button className="bg-[#5a67d8] text-white border-none py-4 px-8 m-2 text-[1.38rem] cursor-pointer rounded-full hover:bg-[#434190]">
                Login Admin
              </button>
            </Link>
            {/* <button
            onClick={scrollToAbout}
            className="px-6 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
          >
            About Us
          </button>
          <button
            onClick={scrollToContact}
            className="px-6 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
          >
            Contact Us
          </button> */}
          </div>
        </div>
      </div>
      {/* <Element name="home">
        <Home />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="contact">
        <Contact />
      </Element> */}
    </div>
  );
};

export default Home;
