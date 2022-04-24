import React from "react";
import PendingStudents from "./PendingStudents";
import ApprovedStudents from "./ApprovedStudents";

function AdminDashboard() {
  return (
    <>
      <PendingStudents />
      <ApprovedStudents />
    </>
  );
}

export default AdminDashboard;
