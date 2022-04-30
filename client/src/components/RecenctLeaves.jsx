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
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";

import { CloseRounded, DoneRounded, Refresh } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getApplications, rejectApplication, refeshApplicationState } from "../redux/applicationSlice";

const ApplicationCard = ({ application, student }) => {
  
  console.log({ student, application });
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
        action={
                approveLevel == 0 ? <Button variant="outlined" color="danger">Rejected</Button> : <Button color="success">Approved</Button>
            
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
      
    </Card>
  );
};

function RecentLeaves() {
  const dispatch = useDispatch();
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { applications } = useSelector((state) => state.applications);
  const { students } = useSelector((state) => state.students);

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
          <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Recent leaves
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
            {applications &&
              Object.entries(applications).map((appObj, index) => {
                return appObj[1].map((app) => {
                  console.log({ app });
                  const studentInfo = students.filter(
                    (s) => s.publicKey == appObj[0]
                  );
                  console.log({ studentInfo });
                  if(app.approveLevel == 0 || app.approveLevel > 3){
                    return (
                        <ApplicationCard
                          key={index}
                          application={app}
                          student={studentInfo[0]}
                        />
                      );
                  }
                });
              })}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default RecentLeaves;
