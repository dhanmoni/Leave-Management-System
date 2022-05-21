import React, { useEffect, useState, useRef } from "react";
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
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";

import {
  CloseRounded,
  DoneRounded,
  ErrorOutline,
  Refresh,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  rejectApplication,
  refeshApplicationState,
  approveApplication,
} from "../redux/applicationSlice";

const ApplicationCard = ({ application, student, system_admin }) => {
  const dispatch = useDispatch();
  const btnClicked = useRef(1);
  const [status, setStatus] = useState("");
  const handleRejectApplication = (key) => {
    dispatch(rejectApplication(key));
    btnClicked.current--;
    setStatus("reject");
  };
  const handleApproveApplication = (key) => {
    dispatch(approveApplication(key));
    btnClicked.current++;
    setStatus("approve");
  };
  console.log({ student, application, system_admin });
  const {
    subject,
    reason,
    startDate,
    endDate,
    approveLevel,
    approvels,
    studentKey,
  } = application;

  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
  return (
    <Card sx={{ margin: 2 }} spacing={2} elevation={4}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{student.name[0]}</Avatar>}
        title={
          <Typography sx={{ fontWeight: "bold" }}>{student.name}</Typography>
        }
        subheader={
          <Box>
            <Typography sx={{}}>
              Department: {student.department.name}
            </Typography>
            <Typography sx={{}}>Hostel: {student.hostel.name}</Typography>
          </Box>
        }
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography
          sx={{ lineHeight: 2, fontWeight: "bold", fontSize: "1.2rem" }}
        >
          {subject}
        </Typography>
        <Typography sx={{ lineHeight: 1.5 }}>{reason}</Typography>
        <Typography>
          From <span style={{ fontWeight: "bold" }}>{s_date}</span>
        </Typography>
        <Typography>
          To: <span style={{ fontWeight: "bold" }}>{e_date}</span>
        </Typography>
      </CardContent>
      {!system_admin && (
        <CardActions sx={{ margin: 1 }}>
          <Box>
            {btnClicked.current == 1 && (
              <>
                <Button
                  sx={{ fontSize: 12, marginRight: "6px" }}
                  edge="end"
                  variant="outlined"
                  color="success"
                  startIcon={<DoneRounded />}
                  onClick={() => handleApproveApplication(student.publicKey)}
                >
                  Approve
                </Button>
                <Button
                  sx={{ fontSize: 12 }}
                  edge="end"
                  variant="outlined"
                  color="danger"
                  startIcon={<CloseRounded />}
                  onClick={() => handleRejectApplication(student.publicKey)}
                >
                  Reject
                </Button>
              </>
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

function PendingLeaves() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { applications } = useSelector((state) => state.applications);
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    if (user.isApproved) {
        students &&
          students.map((s) => {
            console.log("geting application for ", s.publicKey);
            dispatch(getApplications(s.publicKey));
          });
    }
  }, [refresh]);

  const refreshApplications = () => {
    dispatch(refeshApplicationState());
    setRefresh(refresh + 1);
  };

  if (!user.isApproved) {
    return (
      <Grid item xs={12}>
        <Paper
          elevation={4}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: 2,
              color: "red",
            }}
          >
            <ErrorOutline />
            <Typography sx={{ marginLeft: 2 }}>
              Your profile needs to be approved first by the system admin before
              you can perform any action!
            </Typography>
          </Box>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
            Pending leaves
          </Typography>
          <Button startIcon={<Refresh />} onClick={refreshApplications}>
            Refresh
          </Button>
        </Box>
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
            {applications &&
              Object.entries(applications).map((appObj, index) => {
                return appObj[1].map((app) => {
                  console.log({ app });
                  const studentInfo = students.filter(
                    (s) => s.publicKey == appObj[0]
                  );
                  console.log({ studentInfo });
                  let studentHostelID = studentInfo.length
                    ? studentInfo[0].hostel.id
                    : 0;
                  let studentDeptID = studentInfo.length
                    ? studentInfo[0].department.id
                    : 0;
                  if (
                    app.academicLeave &&
                    user.roles[0] === "HOD" &&
                    user.department.id === studentDeptID && 
                    !app.withDrawn
                  ) {
                    if (app.approveLevel === 1) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                    }
                  } else if (
                    user.roles[0] === "LOCAL_GUARDIAN" &&
                    user._id === studentInfo[0].localGuardian.id && 
                    !app.withDrawn
                  ) {
                    if (app.approveLevel == 1) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                    }
                  }
                  // if project guide exists then show him the card
                  else if (
                    studentInfo[0].projectGuide.id &&
                    user.roles[0] === "PROJECT_GUIDE" &&
                    user._id === studentInfo[0].projectGuide.id && 
                    !app.withDrawn
                  ) {
                    if (!app.academicLeave && app.approveLevel === 2) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                    }
                  }

                  // condition to check if admin is HOD of student's dept
                  else if (
                    user.roles[0] === "HOD" &&
                    user.department.id === studentDeptID && 
                    !app.withDrawn
                  ) {
                    // check if project guide exists, if so then approvelevel is 3 for HOD
                    if (
                      studentInfo[0].projectGuide.id &&
                      app.approveLevel === 3
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                      // if project guide doesnot exist, then approvelevel is 2 for HOD
                    } else if (
                      !studentInfo[0].projectGuide.id &&
                      app.approveLevel === 2
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                    }
                  }
                  // check if application requires dsw sign
                  else if (user.roles[0] === "DSW" && 
                  app.dswReq && 
                  !app.withDrawn) {
                    // check if project guide exists, if so then approvelevel is 4 for DSW
                    if (
                      studentInfo[0].projectGuide.id &&
                      app.approveLevel === 4
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                      // if project guide doesnot exist, then approvelevel is 3 for DSW
                    } else if (
                      !studentInfo[0].projectGuide.id &&
                      app.approveLevel === 3
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                    }
                  }
                  //checl for warden
                  else if (
                    user.roles[0] === "WARDEN" &&
                    user.hostel.id === studentHostelID && 
                    !app.withDrawn
                  ) {
                    // check if project guide exists and dsw required, if so then approvelevel is 5 for warden
                    if (
                      studentInfo[0].projectGuide.id & app.dswReq &&
                      app.approveLevel === 5
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                      // if project guide exists but dsw not required, then approvelevel is 4 for Warden
                    } else if (
                      studentInfo[0].projectGuide.id &&
                      !app.dswReq &&
                      app.approveLevel === 4
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                      // if project guide doesnot exist and dsw not required, then approvelevel is 3 for Warden
                    } else if (
                      !studentInfo[0].projectGuide.id &&
                      !app.dswReq &&
                      app.approveLevel === 3
                    ) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                    }
                  } else if (user.roles[0] == "SYSTEM_ADMIN") {
                    if (app.approveLevel > 0) {
                      return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={true}
                        />
                      );
                    }
                  }
                });
              })}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default PendingLeaves;
