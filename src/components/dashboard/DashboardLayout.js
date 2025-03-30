import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import AppTitle from "./AppTitle.js";
import SidebarFooter from "./sidebar/Footer.js";
// import ToolbarActionsSearch from "./navbar/ToolBar.js";
import PageContent from "./main/PageContent.js";
import ToolBar from "./navbar/ToolBar.js";
import { DateContext } from "./DateProviderContext.js";
import { useContext, useState, useEffect } from "react";

const NAVIGATION = [
  //   {
  //     kind: "header",
  //     title: "Main items",
  //   },
  //   {
  //     segment: "dashboard",
  //     title: "Dashboard",
  //     icon: <DashboardIcon />,
  //   },
  {
    segment: "something",
    title: "something",
    // icon: <ShoppingCartIcon />,
    children: [
      { segment: "prod", title: "Prod", list_reports: ["sales", "refund"] },
      { segment: "non-prod", title: "Non-Prod" },
    ],
  },
  { segment: "something2", title: "something2" },
];

const segmentMap = {};
const generateSegmentMap = (in_path, nav) => {
  if (nav.children) {
    nav.children.forEach((child) => {
      generateSegmentMap(in_path + "/" + child.segment, child);
    });
  } else {
    segmentMap[in_path] = nav.list_reports ? nav.list_reports : [nav.segment];
  }
};
generateSegmentMap("", { children: NAVIGATION });
console.log(segmentMap);

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutCustom(props) {
  const { selectedDate } = useContext(DateContext);
  const { window } = props;
  const router = useDemoRouter("/");
  const [listReports, setListReports] = useState([]);
  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;
  console.log(selectedDate);
  console.log(router.pathname);

  useEffect(() => {
    console.log("useEffect", router.pathname, selectedDate);
    if (
      router.pathname === null ||
      //   router.pathname === "/" ||
      selectedDate === null
    ) {
      setListReports([]);
    } else {
      console.log("setListReports", segmentMap[router.pathname]);
      setListReports(segmentMap[router.pathname]);
    }
  }, [router.pathname, selectedDate]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        defaultSidebarCollapsed
        slots={{
          appTitle: AppTitle,
          toolbarActions: ToolBar,
          sidebarFooter: SidebarFooter,
        }}
      >
        {listReports && (
          <PageContent
            listReports={listReports}
            selectedDate={selectedDate}
            pathname={router.pathname}
            key={
              router.pathname + "-" + selectedDate + "-" + listReports.length
            }
          />
        )}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutCustom.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutCustom;
