import * as React from "react";
import { Stack, Typography } from "@mui/material";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";

const AppTitle = (props) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CloudCircleIcon fontSize="large" color="primary" />
      <Typography variant="h6">Dashboard</Typography>
      {/* <Chip size="small" label="BETA" color="info" /> */}
      {/* <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip> */}
    </Stack>
  );
};
export default AppTitle;
