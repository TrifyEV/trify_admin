import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoutes } from "../common/AuthenticatedRoutes";
import Login from "../Login/Login";
import Home from "../Home/Home";

const ComputedRoutes: React.FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default ComputedRoutes;
