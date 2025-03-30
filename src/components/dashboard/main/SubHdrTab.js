import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SubHdrTable from "./SubHdrTable";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: "100%", padding: "0px" }}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubHdrTab(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props.content.PAGEDATA);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          key={0}
        >
          {props.content.PAGEDATA.map((item, index) => (
            <Tab label={item.SUBHDR} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </Box>
      {props.content.PAGEDATA.map((item, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          <SubHdrTable data={item} key={index} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}
