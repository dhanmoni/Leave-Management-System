import React, { useState } from "react";
import { Snackbar } from "@mui/material";

function SnackBar({open, msg, timeout, handleClose }) {
 
  return (
    <Snackbar
      open={open}
      autoHideDuration={timeout}
      onClose={handleClose}
      message={msg}
    />
  );
}

export default SnackBar;
