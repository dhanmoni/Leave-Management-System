import React, {useState} from "react";
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
  TextField,
  Stack,
} from "@mui/material";
import {Send} from '@mui/icons-material'

function ApplyLeave() {
  const [fromDate, setFromDate] = useState(new Date(""));
  const [toDate, setToDate] = useState(new Date(""));

  const handleFromChange = (newValue) => {
    setFromDate(newValue);
  };
  const handleToChange = (newValue) => {
    setToDate(newValue);
  };
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
                Apply For Leave
              </Typography>
              <Divider variant="middle" />
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body1">
                  Provide the required information:
                </Typography>
                <Box onSubmit={() => {}}>
                  <TextField
                    variant="outlined"
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="subject"
                    label="Subject (state the reason of applying for leave)"
                    id="subject"
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    margin="normal"
                    required
                    multiline
                    minRows={3}
                    fullWidth
                    id="desc"
                    label="Give a detailed description of the reason"
                    name="desc"
                  />
                 <Box sx={{display:'flex', flexDirection:'column'}}>


                    <TextField
                      id="from_date"
                      sx={{width: '200px', mt: 2}}
                      label="From"
                      type="date"
                      required
                      defaultValue={fromDate}
                      onChange={handleFromChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      />
                
                    <TextField
                      id="to_date"
                      label="To"
                      type="date"
                      required
                      sx={{width: '200px', mt:2}}
                      defaultValue={toDate}
                      onChange={handleToChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      />
                 
                      </Box>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<Send/>}
                      sx={{ mt: 3, mb: 1, paddingLeft: 6, paddingRight: 6 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default ApplyLeave;
