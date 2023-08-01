import SingIn from "Pages/Auth/SignIn";
import SignUp from "Pages/Auth/SignUp";
import NotFound from "Pages/Main/404/NotFound";
import ArtistDashboard from "Pages/Main/Artist/ArtistDashboard";
import LandingDashboard from "Pages/Main/Landing/LandingDashboard";
import SongsDashboard from "Pages/Main/Songs/SongsDashboard";

const routes = [
  {
    type: "collapse",
    name: "dashboardName",
    route: "/",
    key: "dashboardKey",
    component: <LandingDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "dashboardName",
    route: "/akor/:artist/:song/:id",
    key: "dashboardKey",
    component: <SongsDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "dashboardName",
    route: "/artist/:artist/:id",
    key: "dashboardKey",
    component: <ArtistDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NotFound",
    route: "*",
    key: "NotFound",
    component: <NotFound />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SignIn",
    route: "/login",
    key: "SignIn",
    component: <SingIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SignUp",
    route: "/register",
    key: "SignUp",
    component: <SignUp />,
    noCollapse: true,
  },
  

];

export default routes;
