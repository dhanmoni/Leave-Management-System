import React, {useEffect} from "react";
import Departments from "./Departments";
import Hostels from "./Hostels";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsByHostel,
  getStudentsByDepartment,
  approveStudent,
  rejectStudent,
  getAllStudents,
} from "../redux/studentsSlice";

function SystemAdminDashboard() {
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  const dispatch = useDispatch()
  useEffect(() => {
    if (user.roles[0] == "WARDEN") {
      dispatch(getStudentsByHostel({ id: user.hostel.id, jwt_token }));
    } else if (user.roles[0] == "HOD") {
      dispatch(getStudentsByDepartment({ id: user.department.id, jwt_token }));
    } else if (user.roles[0] == "SYSTEM_ADMIN") {
      dispatch(getAllStudents({jwt_token}))
    }
  }, []);
  return (
    <>
      <Departments />
      <Hostels />
     
    </>
  );
}

export default SystemAdminDashboard;
