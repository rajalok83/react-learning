import React from "react";
import { createRoot } from "react-dom/client";
import DashboardLayoutCustom from "./components/dashboard/DashboardLayout.js";
import { DateProvider } from "./components/dashboard/DateProviderContext.js";
const root = createRoot(document.getElementById("root"));
root.render(
  <DateProvider>
    <DashboardLayoutCustom></DashboardLayoutCustom>
  </DateProvider>
);
