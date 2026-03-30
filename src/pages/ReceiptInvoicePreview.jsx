import { useLocation, useNavigate } from "react-router-dom";
import ReceiptInvoiceTemplate from "../components/ReceiptInvoiceTemplate";

function ReceiptInvoicePreview() {

  const location = useLocation();
   const { invoice, show } = location.state;

const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };
  const handleBack = () => {
    //navigate(-1); // go back with same state
    navigate(`/receipts/edit/${invoice.id}`);
  };
  return (
    <div>

      {/* Print Button */}
      <div className="no-print toolbar d-flex justify-content-between mb-2">

        <button className="btn btn-primary" onClick={handlePrint}>
          Print Invoice
        </button>

        {show && (<button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
)}

      </div>

      {/* Invoice */}
      <div className="print-area ">
        <div className="invoice-copy ">
            <ReceiptInvoiceTemplate invoice={invoice} copyType=''/>

        </div>
        
      </div>
      
      
    </div>
  );
}

export default ReceiptInvoicePreview;