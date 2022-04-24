import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { CloseRounded, DoneRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsByHostel,
  getStudentsByDepartment,
  approveStudent,
  rejectStudent,
} from "../redux/studentsSlice";

function PendingStudents() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('')
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  const handleApproveStudent = (s) => {
    const userData = {
      jwt_token,
      hostel_id: s.hostel.id,
      dept_id: s.department.id,
      publicKey: s.publicKey
    };
    console.log({ userData });
    dispatch(approveStudent(userData))
    setStatus('approve')
  };
  const handleRejectStudent = (s) => {
    const userData = {
      jwt_token,
      publicKey: s.publicKey
    };
    console.log({ userData });
    dispatch(rejectStudent(userData))
    setStatus('reject')
  };
  useEffect(() => {
    if (user.roles[0] == "WARDEN") {
      dispatch(getStudentsByHostel({ id: user.hostel.id, jwt_token }));
    } else if (user.roles[0] == "HOD") {
      dispatch(getStudentsByDepartment({ id: user.department.id, jwt_token }));
    }
  }, []);

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Pending Students
        </Typography>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <List sx={{ width: "100%" }}>
            {(students && students.length) ? (
              <>
                {students.map((student) => {
                  return !student.isApproved && (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <Box>
                            {status == 'approve' ? (
                              <Button
                                sx={{ fontSize: 12, marginRight: "6px" }}
                                color="success"
                                edge="end"
                                variant="outlined"
                                startIcon={<DoneRounded />}
                                //onClick={() => handleApproveStudent(student)}
                              >
                                Approved
                              </Button>
                            ) : status == 'reject' ? (
                              <Button
                                  sx={{ fontSize: 12 }}
                                  edge="end"
                                  variant="outlined"
                                  color="danger"
                                  startIcon={<CloseRounded />}
                                  //onClick={() => handleRejectStudent(student)}
                                >
                                  Rejected
                                </Button>
                            ) : (
                              <>
                                <Button
                                  sx={{ fontSize: 12, marginRight: "6px" }}
                                  color="success"
                                  edge="end"
                                  variant="outlined"
                                  startIcon={<DoneRounded />}
                                  onClick={() => handleApproveStudent(student)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  sx={{ fontSize: 12 }}
                                  edge="end"
                                  variant="outlined"
                                  color="danger"
                                  startIcon={<CloseRounded />}
                                  onClick={() => handleRejectStudent(student)}
                                >
                                  Reject
                                </Button>
                              </>
                            )
                          }
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {student.name}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.primary">
                                Department: {student.department.name}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Hostel: {student.hostel.name}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Email: {student.email}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Phone: {student.phone}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  )
                })}
              </>
            ) : (
              <>
                <Typography>No Data Available...</Typography>
              </>
            )}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default PendingStudents;
