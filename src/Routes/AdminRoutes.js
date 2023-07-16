import AdminArtistDashboard from "Pages/Admin/Artist/AdminArtistDashboard";
import AdminChordsDashboard from "Pages/Admin/Chords/AdminChordsDashboard";
import AdminLandingDashboard from "Pages/Admin/Landing/AdminLandingDashboard";
import AdminPreviewSongDashboard from "Pages/Admin/PreviewSong/AdminPreviewSongDashboard";
import AdminSongsDashboard from "Pages/Admin/Songs/AdminSongsDashboard";
import AdminSongChordsDashboard from "Pages/Admin/SongsChords/AdminSongChordsDashboard";
import AdminUsersDashboard from "Pages/Admin/Users/AdminUsersDashboard";

const routes = [
  {
    type: "collapse",
    name: "Admin Dashboard",
    route: "/",
    key: "Admin Dashboard",
    component: <AdminLandingDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Sanatçılar",
    route: "/sanatcilar",
    key: "Admin Sanatçılar",
    component: <AdminArtistDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Şarkılar",
    route: "/sarkilar",
    key: "Admin Şarkılar",
    component: <AdminSongsDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Akorlar",
    route: "/akorlar",
    key: "Akorlar",
    component: <AdminChordsDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Şarkı Akorları",
    route: "/sarki-akorlari",
    key: "Admin Şarkı Akorları",
    component: <AdminSongChordsDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Kullanıcılar",
    route: "/kullanicilar",
    key: "Admin Kullanicılar",
    component: <AdminUsersDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Kullanıcılar",
    route: "/akor/:artist/:song/:id",
    key: "Admin Kullanicılar",
    component: <AdminPreviewSongDashboard />,
    noCollapse: true,
  },
];

export default routes;
