import * as React from "react";
import { Button, Stack } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useContext } from "react";
import { DateContext } from "../DateProviderContext.js";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers/icons";

const ToolBar = () => {
  const [value, setValue] = React.useState(dayjs());
  const { setSelectedDate } = useContext(DateContext);
  React.useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleAddDay = () => {
    if (value.add(1, "day") <= dayjs()) setValue((prev) => prev.add(1, "day")); // Add one day
  };

  const handleSubtractDay = () => {
    setValue((prev) => prev.subtract(1, "day")); // Subtract one day
  };

  return (
    <Stack direction="row">
      <Button
        color="primary"
        startIcon={<ArrowLeftIcon />}
        onClick={handleSubtractDay}
      ></Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            // label="Select Date"
            sx={{ width: "30px", p: 0, border: 0 }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            maxDate={dayjs()}
            // InputProps={{
            //   disableUnderline: true,
            // }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} />
            )}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button
        color="primary"
        startIcon={<ArrowRightIcon />}
        onClick={handleAddDay}
      ></Button>
      <ThemeSwitcher />
    </Stack>
  );
};

export default ToolBar;
