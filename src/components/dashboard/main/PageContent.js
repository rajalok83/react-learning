import * as React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SubHdrTab from "./SubHdrTab";

const sampleContent = {
  PAGEDATA: [
    {
      SUBHDR: "Item One",
      CONTENT: "Content for Item One",
      COLHDR: ["COL1", "COL2"],
      ROWS: [
        [1, 2],
        ["ROW11", "ROW12"],
        ["ROW21", "ROW22"],
      ],
    },
    { SUBHDR: "Item Two", CONTENT: "Content for Item Two" },
    { SUBHDR: "Item Three", CONTENT: "Content for Item Three" },
  ],
};

function PageContent(props) {
  console.log("PageContent", props);
  // const [content, setContent] = React.useState(null);
  const [contentJSON, setContentJSON] = React.useState({});
  // React.useEffect(() => {
  //   console.log(
  //     "PageContent useEffect",
  //     props.pathname,
  //     props.selectedDate !== null ? props.selectedDate : null
  //   );
  //   if (
  //     props.pathname === null ||
  //     props.pathname === "/" ||
  //     props.selectedDate === null
  //   ) {
  //     setContent(null);
  //   } else {
  //     let url =
  //       window.location.protocol +
  //       "//" +
  //       window.location.host +
  //       "/reports/" +
  //       props.pathname.split("/").pop() +
  //       "-" +
  //       props.selectedDate.$y +
  //       "-" +
  //       ("0" + (props.selectedDate.$M + 1)).slice(-2) +
  //       "-" +
  //       ("0" + props.selectedDate.$D).slice(-2);
  //     console.log("fetching", url);
  //     fetch(url)
  //       .then((response) => {
  //         if (!response.ok) {
  //           console.error(new Error(`HTTP error! status: ${response.status}`));
  //           return { ...sampleContent, content: "From Exception" };
  //         } else {
  //           return response.json();
  //         }
  //       })
  //       .then((json) => {
  //         setContent(
  //           "Content for " +
  //             props.pathname.split("/").pop() +
  //             "\n" +
  //             JSON.stringify(json)
  //         );
  //         setContentJSON(json);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // }, [props.pathname, props.selectedDate]);

  React.useEffect(() => {
    console.log("PageContent useEffect", props);
    setContentJSON({});
    let internalContent = {};
    // console.log(window.location.href.split("/").pop());
    if (props.listReports) {
      props.listReports.forEach((report, index) => {
        console.log("fetching", report);
        // console.log(window.location.href.split("/"));
        // console.log(window.location.href.split("/").length);
        let url =
          (
            (window.location.href.split("/").length === 5
              ? window.location.href.split("/").slice(0, -2).join("/")
              : window.location.href) + "/reports/"
          ).replace("//reports", "/reports") +
          report +
          "-" +
          props.selectedDate.$y +
          "-" +
          ("0" + (props.selectedDate.$M + 1)).slice(-2) +
          "-" +
          ("0" + props.selectedDate.$D).slice(-2);
        console.log("fetching", url);
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              console.error(
                new Error(`HTTP error! status: ${response.status}`)
              );
              return sampleContent;
            } else {
              return response.json();
            }
          })
          .then((json) => {
            // setContent(
            //   "Content for " +
            //     props.pathname.split("/").pop() +
            //     "\n" +
            //     JSON.stringify(json)
            // );
            // setContentJSON(json);
            console.log(json);
            internalContent[report] = json;
            console.log(internalContent);
            setContentJSON({ ...contentJSON, ...internalContent });
          })
          .catch((error) => {
            console.error("Error:", error);
            // internalContent = { ...internalContent, [report]: sampleContent };
          });

        // console.log(internalContent);
      });
    }
  }, [props.pathname, props.listReports, props.selectedDate]);

  React.useEffect(() => {
    console.log("contentJSON", contentJSON);
  }, [contentJSON]);

  return (
    <div key={props.pathname}>
      {Object.keys(contentJSON).map((key, index) => (
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          key={index}
        >
          <Typography key={key}>
            {/* Dashboard content for {props.pathname}{" "} */}
            {props.selectedDate !== null
              ? key +
                " " +
                props.selectedDate.$y +
                "-" +
                ("0" + (props.selectedDate.$M + 1)).slice(-2) +
                "-" +
                ("0" + props.selectedDate.$D).slice(-2)
              : null}
          </Typography>
          {/* <Typography>{content}</Typography> */}
          {contentJSON[key] !== null && (
            <SubHdrTab content={contentJSON[key]} key={key + "-" + index} />
          )}
        </Box>
      ))}
    </div>
  );
}
PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default PageContent;
