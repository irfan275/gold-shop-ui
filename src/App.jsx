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
import ReceiptInvoiceTemplate from "./components/ReceiptInvoiceTemplate";
import ReceiptInvoicePreview from "./pages/ReceiptInvoicePreview";
import GoldPayment from "./pages/goldPayment";
import AddGoldPaymentInvoice from "./pages/AddGoldPaymentInvoice";
import GoldPaymentInvoicePreview from "./pages/GoldPaymentInvoicePreview";

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
          <Route path="add-invoice" element={<ProtectedRoute>< AddInvoice/></ProtectedRoute>} />
          {/* <Route path="/invoice/view/:id" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} /> */}
          <Route path="/invoice/edit/:id" element={<ProtectedRoute><AddInvoice /></ProtectedRoute>} />
          <Route path="/invoice/preview" element={<ProtectedRoute><InvoicePreview /></ProtectedRoute>} />
           {/* for purchase invoice */}
           <Route path="purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />
          <Route path="add-purchase-invoice" element={<ProtectedRoute>< AddPurchaseInvoice/></ProtectedRoute>} />
          <Route path="/purchase-invoice/edit/:id" element={<ProtectedRoute><AddPurchaseInvoice /></ProtectedRoute>} />
          <Route path="/purchase-invoice/preview" element={<ProtectedRoute><PurchaseInvoicePreview /></ProtectedRoute>} />

          <Route path="receipts" element={<ProtectedRoute><Receipts /></ProtectedRoute>} />
          <Route path="add-receipt-invoice" element={<ProtectedRoute>< AddReciptInvoice/></ProtectedRoute>} />
          <Route path="/receipt-invoice/edit/:id" element={<ProtectedRoute><AddReciptInvoice /></ProtectedRoute>} />
          <Route path="/receipt-invoice/preview" element={<ProtectedRoute><ReceiptInvoicePreview /></ProtectedRoute>} />

          <Route path="goldpayment" element={<ProtectedRoute><GoldPayment /></ProtectedRoute>} />
          <Route path="add-goldpayment-invoice" element={<ProtectedRoute>< AddGoldPaymentInvoice/></ProtectedRoute>} />
          <Route path="/goldpayment-invoice/edit/:id" element={<ProtectedRoute><AddGoldPaymentInvoice /></ProtectedRoute>} />
          <Route path="/goldpayment-invoice/preview" element={<ProtectedRoute><GoldPaymentInvoicePreview /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;