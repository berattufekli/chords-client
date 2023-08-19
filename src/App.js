import MainLayout from "./Layout/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";

//Routes
import AuthenticatedRoutes from "./Routes/AuthenticatedRoutes";
import NotAuthenticatedRoutes from "./Routes/NotAuthenticatedRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

// application update
import AdminLayout from "Layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "Components/Loading/Loading";
import { loadUser } from "Store/auth/authSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

const TRACKING_ID = "G-TLXX268MM3";
ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useDispatch();
  const { userAuth, isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    dispatch(loadUser()).then(() => {
      setTimeout(() => setLoading(false), 1000);
    });

    console.log("burası çalıştı");
  }, [dispatch]);

  const getRoutes = (allRoutes) =>
    allRoutes &&
    allRoutes.length > 0 &&
    Array.isArray(allRoutes) &&
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    }
    );

  if (loading) {
    return <Loading />
  }

  if (isAuthenticated === false) {
    return (
      <MainLayout>
        <ToastContainer />
        <Routes>
          {getRoutes(NotAuthenticatedRoutes)}

          {/* <Route path="*" element={<Navigate to="/dashboards/analytics" />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    )
  }


  if (userAuth === "admin") {
    return (
      <AdminLayout>

        <ToastContainer />
        <Routes>
          {getRoutes(AdminRoutes)}

          {/* <Route path="*" element={<Navigate to="/sanatcilar" />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AdminLayout>
    );
  }

  if (userAuth === "student") {
    console.log("student render redildi");
    return (
      <MainLayout>
        <Helmet>
          <meta property="og:title" content={"Akorlar Berat Tüfekli"} />
          <meta property='og:url' content='https://akorflex.com' />
          <meta property='og:site_name' content='akorflex' />
          <meta property='og:author' content='Hüseyin Berat Tüfekli' />
          <meta property='og:publisher' content='Hüseyin Berat Tüfekli' />
        </Helmet>
        <ToastContainer />
        <Routes>
          {getRoutes(AuthenticatedRoutes)}

          {/* <Route path="*" element={<Navigate to="/dashboards/analytics" />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    )

  }

  console.log("null render redildi");
  return null;
}

export default App;
