import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

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
import { CloseRounded, DoneRounded } from "@mui/icons-material";

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { students } = useSelector((state) => state.students);
  const { user, jwt_token } = useSelector((state) => state.auth);
  const [currentUser, setcurrentUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleApproveStudent = (s) => {
    const userData = {
      jwt_token,
      hostel_id: s.hostel.id,
      dept_id: s.department.id,
      publicKey: s.publicKey
    };
    console.log({ userData });
    dispatch(approveStudent(userData))
  };
  const handleRejectStudent = (s) => {
    const userData = {
      jwt_token,
      publicKey: s.publicKey
    };
    console.log({ userData });
    dispatch(rejectStudent(userData))
  };

  useEffect(() => {
    console.log({ id });
    if (id) {
      students.map((s) => {
        if (s._id == id) {
          setcurrentUser(s);
          console.log({ currentUser });
          setLoading(false);
        }
      });
    } else {
      setError(true);
    }
  }, []);

  if (!currentUser) {
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
                  Loading...
                </Typography>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }
  if (currentUser) {
    const { name, email, phone, department, hostel, publicKey, isApproved } =
      currentUser;
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
              {/* Hostel info card*/}
              <Grid item xs={12} md={12} lg={12}>
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
                    User Info
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
                      {name[0]}
                    </Avatar>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: 3,
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }} noWrap>
                        Name: {name}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }} noWrap>
                        Email: {email}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }} noWrap>
                        Phone: {phone}
                      </Typography>

                      <Typography sx={{ fontWeight: "bold" }} noWrap>
                        Profile status: {isApproved ? "Approved" : "Pending"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{pt: 1, display:'flex', justifyContent:'center'}}>
                    {isApproved ? (
                      <Button
                        sx={{ fontSize: 12, marginRight: "6px" }}
                        color="danger"
                        edge="end"
                        variant="outlined"
                        startIcon={<CloseRounded />}
                        //onClick={() => handleApproveStudent(student)}
                      >
                        Delete Student
                      </Button>
                    ) : (
                      <>
                        <Button
                          sx={{ fontSize: 12, marginRight: "6px" }}
                          color="success"
                          edge="end"
                          variant="outlined"
                          startIcon={<DoneRounded />}
                          onClick={() => handleApproveStudent(currentUser)}
                        >
                          Approve
                        </Button>
                        <Button
                          sx={{ fontSize: 12 }}
                          edge="end"
                          variant="outlined"
                          color="danger"
                          startIcon={<CloseRounded />}
                          onClick={() => handleRejectStudent(currentUser)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }
}

export default User;
