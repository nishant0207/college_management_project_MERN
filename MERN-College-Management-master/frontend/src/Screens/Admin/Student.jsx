import React, { useState } from "react";
import Heading from "../../components/Heading";
import AddStudent from "./Student/AddStudent";
import EditStudent from "./Student/EditStudent";
import "./CssFolder/Student.css"
const Student = () => {
  const [selected, setSelected] = useState("add");
  return (
    <div className="Student">
      <div className="flex justify-between items-center w-full text-white">
        <Heading title="Student Details"/>
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-white rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Student
          </button>
          <button
            className={`${
              selected === "edit" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-white rounded-sm`}
            onClick={() => setSelected("edit")}
          >
            Edit Student
          </button>
        </div>
      </div>
      {selected === "add" && <AddStudent />}
      {selected === "edit" && <EditStudent />}
    </div>
  );
};

export default Student;
