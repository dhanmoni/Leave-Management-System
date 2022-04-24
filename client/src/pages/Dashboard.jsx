import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard";
import SystemAdminDashboard from "../components/SystemAdminDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, jwt_token, user, isLoggedIn } = useSelector(
    (state) => state.auth
  );

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
            {/* Profile info */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                  My Profile
                </Typography>
                <Divider variant="middle" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      height: "100px",
                      width: "100px",
                      bgcolor: "primary.main",
                      fontSize: 48,
                    }}
                  >
                    {user.name[0]}
                  </Avatar>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 3,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Name: {user.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Email: {user.email}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Phone: {user.phone}
                    </Typography>

                    {user.roles[0] == "STUDENT" ? (
                      <>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Department: {user.department.name}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Hostel: {user.hostel.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "HOD" ? (
                      <>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Role: Admin (HoD)
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Department: {user.department.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "WARDEN" ? (
                      <>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Role: Admin (Warden)
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Hostel: {user.hostel.name}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography sx={{ fontWeight: "bold" }} noWrap>
                          Role: System Admin
                        </Typography>
                      </>
                    )}

                    <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Profile status: {user.isApproved ? "Approved" : "Pending"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {user.roles[0] == "STUDENT" ? (
              <StudentDashboard />
            ) : user.roles[0] == "SYSTEM_ADMIN" ? (
              <SystemAdminDashboard />
            ) : (
              <AdminDashboard />
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default Dashboard;
