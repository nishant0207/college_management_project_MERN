import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    } else {
    }
  };
  return (
    <div className="Login-screen">
      <div className="color-body">
      <div className="blur-background">
        <p className="text-5xl font-semibold pb-2 border-b-2 border-blue-500">
          {selected && selected} Login
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[100%] text-2xl">
            <label className="mb-2" htmlFor="eno">
              {selected && selected} Login ID
            </label>
            <input
              type="number"
              id="eno"
              required
              className="input-field outline-none border-1 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col w-[100%] mt-3 text-2xl">
            <label className="mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="input-field outline-none border-1 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("password")}
            />
          </div>
          <button className="bg-blue-500 mt-5 text-white px-20 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 left-4">
        <h1>College Management</h1>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className={` ${selected === "Student" && "border-b-2 border-green-500"}`}
          onClick={() => setSelected("Student")}
        >
          Student
        </button>
        <button
          className={`${selected === "Faculty" && "border-b-2 border-green-500"}`}
          onClick={() => setSelected("Faculty")}
        >
          Faculty
        </button>
        <button
          className={`${selected === "Admin" && "border-b-2 border-green-500"}`}
          onClick={() => setSelected("Admin")}
        >
          Admin
        </button>
      </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
