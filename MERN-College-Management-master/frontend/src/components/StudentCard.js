// StudentCard.js

import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div key={student._id} className="border p-4 mb-4">
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Enrollment No: {student.enrollmentNo}</p>
      <p>Email: {student.email}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default StudentCard;
