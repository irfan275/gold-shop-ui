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
import AddPurchaseInvoice from "./pages/AddPurchaseInvoice";
import PurchaseInvoicePreview from "./pages/PurchaseInvoicePreview";
import Purchases from "./pages/purchases";
import Unauthorized from "./pages/UnAuthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="customers" element={<ProtectedRoute ><Customers /></ProtectedRoute>} />
          <Route path="items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path="invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","ADMIN"]}><Users /></ProtectedRoute>} />
          <Route path="add-invoice" element={<ProtectedRoute>< AddInvoice/></ProtectedRoute>} />
          {/* <Route path="/invoice/view/:id" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} /> */}
          <Route path="/invoice/edit/:id" element={<ProtectedRoute><AddInvoice /></ProtectedRoute>} />
          <Route path="/invoice/preview" element={<ProtectedRoute><InvoicePreview /></ProtectedRoute>} />
           {/* for purchase invoice */}
           <Route path="purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />
          <Route path="add-purchase-invoice" element={<ProtectedRoute>< AddPurchaseInvoice/></ProtectedRoute>} />
          <Route path="/purchase-invoice/edit/:id" element={<ProtectedRoute><AddPurchaseInvoice /></ProtectedRoute>} />
          <Route path="/purchase-invoice/preview" element={<ProtectedRoute><PurchaseInvoicePreview /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;