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
} from "@mui/material";
import {
  AddOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import React from "react";
import Layout from "../components/Layout";
import avatar from "../assets/me.jpeg";
import {  useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        key={row.subject}
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
        <TableCell>{row.subject}</TableCell>
        <TableCell align="right">{row.apply_date}</TableCell>
        <TableCell align="right">{row.from}</TableCell>
        <TableCell align="right">{row.to}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow sx={{ borderBottom: 1 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingBottom: 2 }}>
              <Typography>{row.desc}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {publicKey, jwt_token,user, isLoggedIn} = useSelector((state) => state.auth)


  function createData(subject, apply_date, from, to, status, desc) {
    return { subject, apply_date, from, to, status, desc };
  }

  const rows = [
    createData(
      "Stomach Pain",
      "17/01/2022",
      "20/01/2022",
      "27/01/2022",
      "Accepted",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    ),
    createData(
      "Brother's Wedding",
      "22/08/2021",
      "25/08/2021",
      "30/08/2021",
      "Accepted",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ),
    createData(
      "Stomach Pain",
      "20/07/2021",
      "22/07/2021",
      "23/07/2021",
      "Rejected",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    ),
    createData(
      "Head Ache",
      "09/04/2021",
      "10/04/2021",
      "12/04/2021",
      "Accepted",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    ),
  ];
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
                  borderRadius: 3
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                  Student Profile
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
                    sx={{ height: "100px", width: "100px",bgcolor: "primary.main", fontSize: 48 }}
                  >{user.name[0]}</Avatar>
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
                    {/* <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Department: {user.department.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Hostel: {user.hostel.name}
                    </Typography> */}
                    <Typography sx={{ fontWeight: "bold" }} noWrap>
                      Profile status: {user.isApproved ? 'Approved' : 'Pending'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Active Leave applications */}
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ p: 2, display: "flex", flexDirection: "column",borderRadius: 3 }} >
                <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                  Active Leave Application
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
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={4} sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3}}>
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
                          <TableCell sx={{ fontWeight: "bold" }} >
                            Subject
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Apply Date
                          </TableCell>
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
                        {rows.map((row) => (
                          <Row key={row.name} row={row} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default Dashboard;
