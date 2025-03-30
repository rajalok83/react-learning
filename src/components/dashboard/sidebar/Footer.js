import * as React from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const SidebarFooter = ({ props }) => {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {/* {props.mini ? "© MUI" : `© ${new Date().getFullYear()} Made with love by MUI`} */}
    </Typography>
  );
};
SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};
export default SidebarFooter;
