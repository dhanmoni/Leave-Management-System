import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PendingAdmins from "../components/PendingAdmins";
import PendingStudents from "../components/PendingStudents";

import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PendingLeaves from "../components/PendingLeaves";
import RecentLeaves from "../components/RecenctLeaves";
function LeaveRequests() {
  return (
    <Layout>
      <Box
        sx={{
          background: "#F5F6FA",
          flexGrow: 1,
          minHeight: "100vh",
          padding: 5,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={6}>
            <PendingLeaves />
            <RecentLeaves/>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default LeaveRequests;
