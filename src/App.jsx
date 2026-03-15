import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Users from "./pages/Users";
import Items from "./pages/Items";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AddInvoice from "./pages/AddInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import InvoicePreview from "./pages/InvoicePreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path="invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="add-invoice" element={<ProtectedRoute>< AddInvoice/></ProtectedRoute>} />
          <Route path="/invoice/view/:id" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} />
          <Route path="/invoice/edit/:id" element={<ProtectedRoute><AddInvoice /></ProtectedRoute>} />
          <Route path="/invoice/preview" element={<ProtectedRoute><InvoicePreview /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;