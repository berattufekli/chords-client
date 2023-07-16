import MainLayout from "./Layout/MainLayout";
import { Routes, Route } from "react-router-dom";

//Routes
import MainRoutes from "./Routes/MainRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

// application update
import data from "./status.json"
import AdminLayout from "Layout/AdminLayout";

function App() {

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

  if (data.user === "admin") {
    return (
      <AdminLayout>
        <Routes>
          {getRoutes(AdminRoutes)}

          {/* <Route path="*" element={<Navigate to="/dashboards/analytics" />} /> */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <MainLayout>
      <Routes>
        {getRoutes(MainRoutes)}

        {/* <Route path="*" element={<Navigate to="/dashboards/analytics" />} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </MainLayout>

  );
}

export default App;
