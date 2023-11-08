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

let newNavItems = [
  {
    "type": "g", "label": "New Label1 - 1", "menulabel": "Label1-1", "items":
      [
        { "type": "i", "label": "Home", "component": "Home" },
        { "type": "i", "label": "About", "component": "About" },
        { "type": "i", "label": "Contact", "component": "Contact" },
        {
          "type": "g", "label": "New Label2- 1", "menulabel": "Label2-1", "items":
            [
              { "type": "i", "label": "Home2", "component": "Home" },
              { "type": "i", "label": "About2", "component": "About" },
              { "type": "i", "label": "Contact2", "component": "Contact" }
            ]
        }
      ]
  },
  {
    "type": "g", "label": "AWS", "menulabel": "AWSLabel1-2", "items":
      [
        { "type": "i", "label": "Home3", "component": "Home" },
        { "type": "i", "label": "About3", "component": "About" },
        { "type": "i", "label": "Contact3", "component": "Contact" }
      ]
  }
  ,
  { "type": "i", "label": "About", "component": "About" }
]

let navItems = ["Home"
  , "About", "Contact"
];

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
      <Dashboard headers={navHeaders} sidebarItems={newNavItems} handleRenderView={handleRenderView} />
      <Container maxWidth="sm">
        {(() => {
          switch (renderView) {
            case "Home":
              return <Home />;
            case "About":
              return <About />;
            default:
              return <Default />;
          }
        })()
        }
      </Container>
    </div>
  );
};