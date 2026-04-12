import { Routes, Route } from "react-router-dom";
import  HomePage  from "@/pages/HomePage";
import  LoginPage  from "../pages/LoginPage";
import ServicesPage from "@/components/Services";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
