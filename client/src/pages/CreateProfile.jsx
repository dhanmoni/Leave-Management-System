import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Card,
  MenuItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import { AssignmentIndOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdminProfile, createUserProfile } from "../redux/authSlice";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hostel, setHostel] = useState("");
  const [department, setDept] = useState("");
  const [role, setRole] = useState("student");
  const [adminRole, setAdminRole] = useState("");
  const roles = [
    { name: "Head Of Department(HoD)", value: "HOD" },
    { name: "Warden", value: "WARDEN" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, jwt_token, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const {hostels, departments} = useSelector(state=> state.data)



  const handleRoleChange = (e) => {
    setAdminRole(e.target.value);
    console.log(e.target.value);
  };
  // console.log({availableHostels, availableDepts})
  const handleHostelChange = (e) => {
    console.log(e.target.value);
    setHostel(e.target.value);
  };
  const handleDeptChange = (e) => {
    setDept(e.target.value);
  };

  const parseHostelData = ()=> {
      const hostelInfo = hostel.split("&&&");
      const hostelID = hostelInfo[0];
      const hostelName = hostelInfo[1];
      const hostelData = {
        id: hostelID,
        name: hostelName,
      };
      return hostelData
  }

  const parseDeptData = ()=> {
      const deptInfo = department.split("&&&");
      const deptID = deptInfo[0];
      const deptName = deptInfo[1];
      const deptData = {
        id: deptID,
        name: deptName,
      };
      return deptData
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(role == 'student'){
      const hostelData = parseHostelData()
      const deptData = parseDeptData()
      
      const studentData = {
        name,
        phone,
        email,
        hostel: hostelData,
        department: deptData,
        publicKey,
        jwt_token,
      };
      console.log({studentData})
      dispatch(createUserProfile(studentData));
    } else if(adminRole == 'HOD'){
      const deptData = parseDeptData()
      const adminHodData = {
        name,
        phone,
        email,
        role: 'HOD',
        department: deptData,
        publicKey,
        jwt_token,
      }
      console.log({adminHodData})
      //call createAdminProfile for hod
      dispatch(createAdminProfile(adminHodData))
    } else if (adminRole == 'WARDEN'){

      const hostelData = parseHostelData()

      const adminWardenData ={
        name,
        phone,
        email,
        role: 'WARDEN',
        hostel: hostelData,
        publicKey,
        jwt_token,
      }

      console.log({adminWardenData})
      dispatch(createAdminProfile(adminWardenData))
      //call createAdminProfile for warden
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else if (jwt_token) {
      navigate("/create-profile");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Box
      className="create-profile"
      sx={{
        flexGrow: 1,
        height: "auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ width: "80%", margin: "0 auto" }}>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Leave Management System
          </Typography>

          <MenuItem>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontWeight: 600 }}
            >
              Help
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontWeight: 600 }}
            >
              About Us
            </Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: 5,
            borderRadius: 2,
            margin: 2,
          }}
          elevation={2}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AssignmentIndOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Complete your profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {role == "admin" ? (
              <>
                <TextField
                  id="select-role"
                  select
                  margin="normal"
                  required
                  fullWidth
                  label="Select Role"
                  onChange={handleRoleChange}
                  variant="outlined"
                  value={adminRole}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.name} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {adminRole == "HOD" && (
                  <TextField
                    id="select-dept"
                    select
                    margin="normal"
                    required
                    fullWidth
                    label="Select Department"
                    onChange={handleDeptChange}
                    variant="outlined"
                    value={department}
                  >
                    {departments && departments.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={`${option._id}&&&${option.name}`}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                {adminRole == "WARDEN" && (
                  <TextField
                    id="select-hostel"
                    select
                    margin="normal"
                    required
                    fullWidth
                    label="Select Hostel"
                    onChange={handleHostelChange}
                    variant="outlined"
                    value={hostel}
                  >
                    {hostels && hostels.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={`${option._id}&&&${option.name}`}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <Typography sx={{color:"primary.main", textDecoration:'underline', fontSize: 14}} onClick={() => setRole("student")}>
                  Create profile as student?
                </Typography>
              </>
            ) : (
              <>
                <TextField
                  id="select-dept"
                  select
                  margin="normal"
                  required
                  fullWidth
                  label="Select Department"
                  onChange={handleDeptChange}
                  variant="outlined"
                  value={department}
                >
                  {departments && departments.map((option) => (
                    <MenuItem
                      key={option.name}
                      value={`${option._id}&&&${option.name}`}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="select-hostel"
                  select
                  margin="normal"
                  required
                  fullWidth
                  label="Select Hostel"
                  onChange={handleHostelChange}
                  variant="outlined"
                  value={hostel}
                >
                  {hostels && hostels.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={`${option._id}&&&${option.name}`}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography sx={{color:"primary.main", textDecoration:'underline', fontSize: 14}} onClick={() => setRole("admin")}>
                  Create profile as admin?
                </Typography>
              </>
            )}

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 1, paddingLeft: 6, paddingRight: 6 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
