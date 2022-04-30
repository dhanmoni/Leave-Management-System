import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  AddOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import PendingLeaveCard from './PendingLeaveCard'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "../redux/applicationSlice";

const Row = ({ application }) => {
  const { subject, reason, startDate, endDate, approveLevel, approvels } =
    application;
  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
  const [open, setOpen] = React.useState(false);
  let diff = endDate - startDate;
  let hoursDifference = Math.floor(diff / 60 / 60);
  const steps = [
    {
      label: (
        <Typography sx={{ fontWeight: "bold", color: "green" }}>
          Application Submitted
        </Typography>
      ),
    },
    {
      label:
        approveLevel == 2 || approveLevel == 3 || approveLevel == 4 ? (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Approved by Warden
          </Typography>
        ) : approveLevel == 0 && approvels.length == 1 ? (
          <Typography sx={{ fontWeight: "bold", color: "red" }}>
            Rejected by Warden
          </Typography>
        ) : approveLevel == 0 && approvels.length > 1 ? (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Approved by Warden
          </Typography>
        ) : (
          "Approval by Warden"
        ),
    },
    {
      label:
        approveLevel == 3 ||
        approveLevel == 4 ||
        (approveLevel == 0 && approvels.length == 3) ? (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Approved by HoD
          </Typography>
        ) : approveLevel == 0 && approvels.length == 2 ? (
          <Typography sx={{ fontWeight: "bold", color: "red" }}>
            Rejected by HoD
          </Typography>
        ) : (
          "Approval by HoD"
        ),
    },
  ];
  return (
    <React.Fragment>
      <TableRow
        key={subject}
        onClick={() => setOpen(!open)}
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": { cursor: "pointer" },
        }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{subject}</TableCell>
        <TableCell align="right">{s_date}</TableCell>
        <TableCell align="right">{e_date}</TableCell>
        <TableCell align="right">
          {approveLevel > 3
            ? "Approved"
            : approveLevel == 0
            ? "Rejected"
            : "Pending"}
        </TableCell>
      </TableRow>
      <TableRow sx={{ borderBottom: 1 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingBottom: 2 }}>
              <Typography>{reason}</Typography>
            </Box>
            <Box>
            <Stepper activeStep={approvels.length} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
            {hoursDifference >= 72 && (
              <Step>
                <StepLabel>
                  {approveLevel > 3 ? (
                    <Typography sx={{ fontWeight: "bold", color: "green" }}>
                      Approved by DSW
                    </Typography>
                  ) : approveLevel == 0 && approvels.length == 3 ? (
                    <Typography sx={{ fontWeight: "bold", color: "red" }}>
                      Rejected by DSW
                    </Typography>
                  ) : (
                    "Approval by DSW"
                  )}
                </StepLabel>
              </Step>
            )}
          </Stepper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};


function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { applications } = useSelector((state) => state.applications);
  const { publicKey } = useSelector((state) => state.auth);
  const showApplyBtn = useState(true)
  useEffect(() => {
    dispatch(getApplications(publicKey));
  }, []);


  
  return (
    <>
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
          <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
            Active Leave Application
          </Typography>
          <Divider variant="middle" />
          {
            applications && 
            Object.keys(applications).length != 0 &&
            applications[publicKey] && applications[publicKey].map(app=> {
              showApplyBtn[0] = false
              if(app.approveLevel == 1){
                return <PendingLeaveCard application={app} key={app.studentKey}/>
              }
            })
          }
          {
            showApplyBtn[0] == true && (

          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>
              You do not have any active leave application!
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              endIcon={<AddOutlined />}
              onClick={() => navigate("/apply")}
            >
              Apply leave
            </Button>
          </Box>
           )
          }
        </Paper>
      </Grid>

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
          
          <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
            Recent Leave Applications
          </Typography>
          <Divider variant="middle" />
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ background: "#F5F6FA" }}>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      From Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      To Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications &&
                    Object.entries(applications).map((appObj, index) => {
                      return appObj[1].map((app) => {
                        if (app.approveLevel != 1) {
                          return <Row key={index} application={app} />;
                        }
                      });
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default StudentDashboard;
