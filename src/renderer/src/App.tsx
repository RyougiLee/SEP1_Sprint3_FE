import React from "react"
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const App = () => {
  return(
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />

          <Route path="" element={<MainLayout/>}>
            <Route index element={<Home/>} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

export default App