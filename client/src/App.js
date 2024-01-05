import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import EditUser from "./features/users/EditUser";
import NewUser from "./features/users/NewUserForm";
import Prefetech from "./features/auth/Prefetech";
import PersistLogin from "./features/auth/PersistLogin";
import ROLES from './config/roles';
import AuthRoles from './features/auth/authRoles';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<AuthRoles allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetech />}>

              <Route path="dash" element={<DashLayout />} >
                <Route index element={<Welcome />} />


                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                <Route element={<AuthRoles allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>

                  <Route path="users" >
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUser />} />
                  </Route>

                </Route>

              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
