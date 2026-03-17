import { useLocation } from "react-router-dom";
import InvoiceTemplate from "../components/InvoiceTemplate";

function InvoicePreview() {

  const location = useLocation();
  const invoice = location.state;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>

      {/* Print Button */}
      <div className="no-print toolbar">

        <button onClick={handlePrint}>
          Print Invoice
        </button>

      </div>

      {/* Invoice */}
      <div className="print-area">
        <div className="invoice-copy">
            <InvoiceTemplate invoice={invoice} copyType='Customer Copy'/>

        </div>
        <div className="invoice-copy">
            <InvoiceTemplate invoice={invoice} copyType='Merchant Copy'/>

        </div>
      </div>
      
      
    </div>
  );
}

export default InvoicePreview;