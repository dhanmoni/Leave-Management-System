import React from "react";
import Departments from "./Departments";
import Hostels from "./Hostels";
import PendingAdmins from "./PendingAdmins";
import PendingStudents from "./PendingStudents";

function SystemAdminDashboard() {
  return (
    <>
      <Departments />
      <Hostels />
      <PendingStudents />
      <PendingAdmins />
    </>
  );
}

export default SystemAdminDashboard;
