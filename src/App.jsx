import React from "react";
import RegisterPage from "./component/Register";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./component/Login";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Linkpage from "./component/Linkpage";
import Unauthorized from "./component/Unauthorized";
import Editor from "./component/Editor";
import Admin from "./component/Admin";
import Lounge from "./component/Lounge";
import Missing from "./component/Missing";
import RequireAuth from "./component/RequireAuth";
import AllUsers from "./component/AllUsers";



const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="linkpage" element={<Linkpage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes  */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[2001, ]} />}>
          <Route path="allUsers" element={<AllUsers />} />
          </ Route >

        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all  */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
