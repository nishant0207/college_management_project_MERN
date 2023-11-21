import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";
import "./CSS Folder/Marks.css"

const Marks = () => {
  const [subject, setSubject] = useState();
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    examType: "",
  });
  const loadStudentDetails = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { branch: selected.branch, semester: selected.semester },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitMarksHandler = () => {
    let container = document.getElementById("markContainer");
    container.childNodes.forEach((enroll) => {
      setStudentMarksHandler(
        enroll.id,
        document.getElementById(enroll.id + "marks").value
      );
    });
  };

  const setStudentMarksHandler = (enrollment, value) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/addMarks`,
        {
          enrollmentNo: enrollment,
          [selected.examType]: {
            [selected.subject]: value,
          },
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.dismiss();
          toast.success(response.data.message);
        } else {
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSubjectData = () => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBranchData();
    getSubjectData();
  }, []);

  const resetValueHandler = () => {
    setStudentData();
  };

  return (
    <div className="Marks w-[85%] mx-auto flex justify-center items-start flex-col my-10 py-5 px-2 text-white">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Upload Marks`} />
        {studentData && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
            onClick={resetValueHandler}
          >
            <span className="mr-2">
              <BiArrowBack className="text-red-500" />
            </span>
            Close
          </button>
        )}
      </div>
      {!studentData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6 text-black p-4">
            <div className="w-full">
              <label htmlFor="branch" className="leading-7 text-base ">
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-blue-50 py-3 text-base w-full accent-blue-700 mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {branch &&
                  branch.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="semester" className="leading-7 text-base ">
                Select Semester
              </label>
              <select
                id="semester"
                className="px-2 bg-blue-50 py-3 text-base w-full accent-blue-700 mt-1 rounded-lg"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="subject" className="leading-7 text-base ">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-blue-50 py-3 text-base w-full accent-blue-700 mt-1 rounded-lg"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {subject &&
                  subject.map((subject) => {
                    return (
                      <option value={subject.name} key={subject.name}>
                        {subject.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="examType" className="leading-7 text-base ">
                Select Exam Type
              </label>
              <select
                id="examType"
                className="px-2 bg-blue-50 py-3 text-base w-full accent-blue-700 mt-1 rounded-lg"
                value={selected.examType}
                onChange={(e) =>
                  setSelected({ ...selected, examType: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
          <button
            className="px-4 py-2 mt-8 mx-auto border-2 border-blue-500 text-black rounded-lg"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      )}
      {studentData && studentData.length !== 0 && (
        <>
          <p className="mt-4 text-lg">
            Upload {selected.examType} Marks Of {selected.branch} Semester{" "}
            {selected.semester} of {selected.subject}
          </p>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="markContainer"
          >
            {studentData.map((student) => {
              return (
                <div
                  key={student.enrollmentNo}
                  className="w-[30%] flex justify-between items-center border-2 border-blue-500 rounded"
                  id={student.enrollmentNo}
                >
                  <p className="text-lg px-4 w-1/2">
                    {student.enrollmentNo}
                  </p>
                  <input
                    type="number"
                    className="px-6 py-2 focus:ring-0 outline-none w-1/2 bg-gray-50"
                    placeholder="Enter Marks"
                    id={`${student.enrollmentNo}marks`}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="border-2 border-blue-500 px-6 py-3 mt-8 mx-auto rounded text-white"
            onClick={submitMarksHandler}
          >
            Upload Student Marks
          </button>
        </>
      )}
    </div>
  );
};

export default Marks;
