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
} from "@mui/material";
import { CloseRounded, DoneRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdmins, approveAdmin, rejectAdmin
} from "../redux/adminSlice";

function PendingLeaves() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('')
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { admins } = useSelector((state) => state.admins);

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Pending leaves
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
            {(admins && admins.length) ? (
              <>
                {admins.map((admin) => {
                  return !admin.isApproved && (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <Box>
                            {status == 'approve' ? (
                              <Button
                                sx={{ fontSize: 12, marginRight: "6px" }}
                                color="success"
                                edge="end"
                                variant="outlined"
                                startIcon={<DoneRounded />}
                                //onClick={() => handleApproveAdmin(admin)}
                              >
                                Approved
                              </Button>
                            ) : status == 'reject' ? (
                              <Button
                                  sx={{ fontSize: 12 }}
                                  edge="end"
                                  variant="outlined"
                                  color="danger"
                                  startIcon={<CloseRounded />}
                                  //onClick={() => handleRejectAdmin(admin)}
                                >
                                  Rejected
                                </Button>
                            ) : (
                              <>
                                <Button
                                  sx={{ fontSize: 12, marginRight: "6px" }}
                                  color="success"
                                  edge="end"
                                  variant="outlined"
                                  startIcon={<DoneRounded />}
                                  onClick={() => handleApproveAdmin(admin)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  sx={{ fontSize: 12 }}
                                  edge="end"
                                  variant="outlined"
                                  color="danger"
                                  startIcon={<CloseRounded />}
                                  onClick={() => handleRejectAdmin(admin)}
                                >
                                  Reject
                                </Button>
                              </>
                            )
                          }
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {admin.name}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              {/* <Typography variant="body2" color="text.primary">
                                Department: {admin.department.name}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Hostel: {admin.hostel.name}
                              </Typography> */}
                              <Typography variant="body2" color="text.primary">
                                Email: {admin.email}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Phone: {admin.phone}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  )
                })}
              </>
            ) : (
              <>
                <Typography align="center">No Data Available...</Typography>
              </>
            )}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default PendingLeaves;
