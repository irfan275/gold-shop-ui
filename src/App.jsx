import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AdminLayout />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="customers" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;