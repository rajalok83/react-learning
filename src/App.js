const { useState } = React;

const {
  Typography,
  Container,
  Box
} = MaterialUI;
let newNavItems = [
  {
    "type": "g", "items": [{ "type": "i", "item": 'Home' }
      , { "type": "i", "item": 'About' }, { "type": "i", "item": 'Contact' }
    ]
  },
  { "type": "i", "item": "About" }
]
let navItems = ['Home'
  , 'About', 'Contact'
];
let navHeaders = ['TCO'];

const Default = () => {
  return (<Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Material UI CDN example
    </Typography>
    <ProTip />
    <Copyright />
  </Box>)

};

const Home = () => {
  return (<Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Home
    </Typography>
    <ProTip />
    <Copyright />
  </Box>)

};

const About = () => {
  return (<Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      About
    </Typography>
    <ProTip />
    <Copyright />
  </Box>)

};

const Contact = () => {
  return (<Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Contact
    </Typography>
    <ProTip />
    <Copyright />
  </Box>)

};

const App = () => {
  const [renderView, setRenderView] = useState("Default");

  const handleRenderView = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent !== "noview")
      setRenderView(e.target.textContent);
    console.log(renderView);
  };

  return (
    <div>
      <Dashboard
        headers={navHeaders} sidebarItems={navItems} handleRenderView={handleRenderView}
      />
      <Container maxWidth="sm">
        {(() => {
          switch (renderView) {
            case 'Home':
              return <Home />;
            case 'About':
              return <About />;
            default:
              return <Default />;
          }
        })()}
      </Container>
    </div>

  );
};