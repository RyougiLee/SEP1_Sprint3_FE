import React, {useEffect} from "react"
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import {WorkspaceLayout} from "@/layouts/WorkspaceLayout";
import {WorkspaceOverview} from "@/pages/WorkspaceDetail/Overview";
import {ProtectedRoute} from "@/routes/ProtectedRoute";
import {useUserStore} from "@/store";
import {useAuth} from "@/hooks/useAuth";
import {useGetUserDetails} from "@/hooks/useGetUserDetails";
import {AssignmentDetail} from "@/pages/WorkspaceDetail/Assignments/AssignmentDetail";
import {LoginForm} from "@/components/features/LoginForm";
import {SignupForm} from "@/components/features/SignupForm";
import {WorkspaceList} from "@/pages/WorkspaceList";
import {AssignmentListPage} from "@/pages/WorkspaceDetail/Assignments/AssignmentListPage";

const App = () => {

  //Sync user info when start
  const setUser = useUserStore(state => state.setUser);
  const {user} = useAuth();
  const savedUserId = user?.id;
  const {data: serverUser, isLoading, isError} = useGetUserDetails(savedUserId, {
    enabled: !!savedUserId
  });
  useEffect(() => {
    if (serverUser) {
      setUser(serverUser);
    }
  }, [serverUser, setUser]);
  if (isLoading && savedUserId) {
    return <div>Syncing with database...</div>;
  }

  return(
    <HashRouter>
      <Routes>
        {/*<Route path="/login" element={<Login/>} />*/}
        <Route path="/login" element={<Login/>}>
          <Route index element={<LoginForm/>}/>
          <Route path="signup" element={<SignupForm/>}/>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path="/workspaces" element={<WorkspaceList />} />
            <Route path="/workspaces/:courseId" element={<WorkspaceLayout />}>
              <Route index element={<WorkspaceOverview />} />
              <Route path="assignments" element={<AssignmentListPage />} />
              {/*<Route path="members" element={<MemberList />} />*/}
              <Route path="assignments/:assignmentId" element={<AssignmentDetail />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App