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

const PendingLeaveCard = ({ application }) => {
  let { subject, reason, startDate, endDate, approveLevel, approvels } =
    application;
  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
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
      </CardContent>
    </Card>
  );
};

export default PendingLeaveCard;
