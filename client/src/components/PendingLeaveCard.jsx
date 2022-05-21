import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
} from "@mui/material";

const PendingLeaveCard = ({ application, user }) => {
  let {
    subject,
    reason,
    startDate,
    endDate,
    approveLevel,
    approvels,
    dswReq,
    academicLeave,
  } = application;
  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
  let steps;
  if (academicLeave) {
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
    ];
  } else if (!dswReq && !user.projectGuide.id) {
    steps = [
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
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
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
      {
        label:
          approveLevel == 4 || (approveLevel == 0 && approvels.length == 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  } else if(!dswReq && user.projectGuide.id){
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 || approveLevel == 3 || approveLevel == 4 || approveLevel == 5 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 2) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Project Guide
            </Typography>
          ) : approveLevel == 0 && approvels.length == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Project Guide
            </Typography>
          ) : (
            "Approval by Project Guide"
          ),
      },
      {
        label:
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
      {
        label:
          approveLevel == 5 || (approveLevel == 0 && approvels.length > 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length > 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  } else if(dswReq && user.projectGuide?.id){
    steps = [
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
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 2) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Project Guide
            </Typography>
          ) : approveLevel == 0 && approvels.length == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Project Guide
            </Typography>
          ) : (
            "Approval by Project Guide"
          ),
      },
      {
        label:
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
      {
        label:
          approveLevel == 5 || (approveLevel == 0 && approvels.length > 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by DSW
            </Typography>
          ) : approveLevel == 0 && approvels.length > 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by DSW
            </Typography>
          ) : (
            "Approval by DSW"
          ),
      },
      {
        label:
          approveLevel == 6 || (approveLevel == 0 && approvels.length > 5) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length > 5 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  } else if(dswReq && !user.projectGuide?.id){
    steps = [
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
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 2) ? (
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
      {
        label:
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by DSW
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by DSW
            </Typography>
          ) : (
            "Approval by DSW"
          ),
      },
      {
        label:
          approveLevel == 5 || (approveLevel == 0 && approvels.length > 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length > 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      }
    ];
  }

  return (
    <Card sx={{ margin: 2 }} spacing={2} elevation={4}>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography sx={{ marginRight: 2 }}>Status:</Typography>
          <Stepper activeStep={approvels.length} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PendingLeaveCard;
