// pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to the Complaint Management System
      </h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/user-login">
          <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            User
          </button>
        </Link>
        <Link to="/admin-login">
          <button className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Admin
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
