import MainLayout from "./Layout/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";

//Routes
import MainRoutes from "./Routes/MainRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

// application update
import AdminLayout from "Layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "Components/Loading/Loading";
import { loadUser } from "Store/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { userAuth, isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    dispatch(loadUser()).then(() => {
      setTimeout(() => setLoading(false), 1000);
    });
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
    }
    );

  if (loading) {
    return <Loading />
  }

  if (isAuthenticated === false || userAuth === "student") {
    console.log("burası render edildi");
    return <MainLayout>
      <Routes>
        {getRoutes(MainRoutes)}

        {/* <Route path="*" element={<Navigate to="/dashboards/analytics" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  }


  if (userAuth === "admin") {

  }

  return (
    <AdminLayout>
      <Routes>
        {getRoutes(AdminRoutes)}

        {/* <Route path="*" element={<Navigate to="/sanatcilar" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AdminLayout>
  );

}

export default App;
