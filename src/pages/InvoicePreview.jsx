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
      <InvoiceTemplate invoice={invoice} />

    </div>
  );
}

export default InvoicePreview;