import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import "./Navbar.css";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  return (
    <div className="NavBar">
      <p
        className="dasboard font-semibold text-2xl flex justify-center"
      >
        <span className="mr-2">
          <RxDashboard />
        </span>{" "}
        {router.state && router.state.type} Dashboard
      </p>
      <button
        className="logout flex justify-center items-center text-black-500 px-3 py-2 font-semibold rounded-sm"
        onClick={() => navigate("/")}
      >
        Logout
        <span className="ml-2">
          <FiLogOut />
        </span>
      </button>
    </div>
  );
};
export default Navbar;
