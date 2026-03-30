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
import Receipts from "./pages/Receipt";
import AddReciptInvoice from "./pages/AddReceiptInvoice";
import ReceiptInvoicePreview from "./pages/ReceiptInvoicePreview";
import AddGoldPaymentInvoice from "./pages/AddGoldPaymentInvoice";
import GoldPaymentInvoicePreview from "./pages/GoldPaymentInvoicePreview";
import GoldPayment from "./pages/GoldPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="customers" element={<ProtectedRoute ><Customers /></ProtectedRoute>} />
          <Route path="items" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","ADMIN"]}><Items /></ProtectedRoute>} />
          <Route path="invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","ADMIN"]}><Users /></ProtectedRoute>} />
          <Route path="/invoices/add" element={<ProtectedRoute>< AddInvoice/></ProtectedRoute>} />
          {/* <Route path="/invoice/view/:id" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} /> */}
          <Route path="/invoices/edit/:id" element={<ProtectedRoute><AddInvoice /></ProtectedRoute>} />
          <Route path="/invoices/preview" element={<ProtectedRoute><InvoicePreview /></ProtectedRoute>} />
           {/* for purchase invoice */}
           <Route path="purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />
          <Route path="/purchases/add" element={<ProtectedRoute>< AddPurchaseInvoice/></ProtectedRoute>} />
          <Route path="/purchases/edit/:id" element={<ProtectedRoute><AddPurchaseInvoice /></ProtectedRoute>} />
          <Route path="/purchases/preview" element={<ProtectedRoute><PurchaseInvoicePreview /></ProtectedRoute>} />

          <Route path="receipts" element={<ProtectedRoute><Receipts /></ProtectedRoute>} />
          <Route path="receipts/add" element={<ProtectedRoute>< AddReciptInvoice/></ProtectedRoute>} />
          <Route path="/receipts/edit/:id" element={<ProtectedRoute><AddReciptInvoice /></ProtectedRoute>} />
          <Route path="/receipts/preview" element={<ProtectedRoute><ReceiptInvoicePreview /></ProtectedRoute>} />

          <Route path="goldpayment" element={<ProtectedRoute><GoldPayment /></ProtectedRoute>} />
          <Route path="goldpayment/add" element={<ProtectedRoute>< AddGoldPaymentInvoice/></ProtectedRoute>} />
          <Route path="/goldpayment/edit/:id" element={<ProtectedRoute><AddGoldPaymentInvoice /></ProtectedRoute>} />
          <Route path="/goldpayment/preview" element={<ProtectedRoute><GoldPaymentInvoicePreview /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;