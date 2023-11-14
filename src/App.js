const {
  Box,
  Container,
  Typography
} = MaterialUI;

const { useState } = React;

const Home = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <ProTip />
      <Copyright />
    </Box>
  )
};

const About = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      <ProTip />
      <Copyright />
    </Box>
  )
};

const Contact = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact
      </Typography>
      <ProTip />
      <Copyright />
    </Box>
  )
};

let navItems = [
  {
    "type": "g", "label": "AWS", "menulabel": "AWS", "items":
      [
        { "type": "i", "label": "DynamoDB", "component": "DynamoDB" },
        // { "type": "i", "label": "About3", "component": "About" },
        // { "type": "i", "label": "Contact3", "component": "Contact" }
      ]
  }
  ,
  { "type": "i", "label": "About", "component": "About" }
]

// let navItems = ["Home"
//   , "About", "Contact"
// ];

let navHeaders = ["TCO"];

const Default = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Material UI CDN example
      </Typography>
      <ProTip />
      <Copyright />
    </Box>
  )
};

const App = () => {
  const [renderView, setRenderView] = useState("Default");

  const handleRenderView = (e) => {
    console.log(e);
    if (e !== "noview")
      setRenderView(e);
    console.log(renderView);
  };

  return (
    <div>
      <Dashboard headers={navHeaders} sidebarItems={navItems} handleRenderView={handleRenderView} />
      <Container maxWidth="false">
        {(() => {
          switch (renderView) {
            case "Home":
              return <Home />;
            case "About":
              return <About />;
            case "DynamoDB":
              return <DynamoDB />;
            default:
              return <DynamoDB />;
          }
        })()
        }
      </Container>
    </div>
  );
};