import { useEffect, useState } from "react";
import "../css/invoice.css";
import { getCustomerById } from "../services/customerService";
import { getShopById, getShops } from "../services/userService";

function InvoiceTemplate({ invoice }) {
  const [customer,setCustomer] = useState({});
  const [shop,setShop] = useState({});
  const [name,setName] = useState("");
  useEffect(() => {
    const loadCustomer = async () => {
      const res = await getCustomerById(invoice.customer._id);
      setCustomer(res.data.data || []);
    };
  
    loadCustomer();
  }, []);
    useEffect(() => {
      fetchShop();
    }, []);
    const fetchShop = async () => {
      const response = await getShopById(invoice.shop);
      setShop(response.data.data || []);
    };
  useEffect(() => {
    setName(localStorage.getItem('name'));
  }, [name]);
  const minRows = 6; // minimum rows to keep table height fixed
  const items = invoice?.items || []; // dynamic items
  const emptyRows = minRows - items.length > 0 ? minRows - items.length : 0;
  return (
    <div className="invoice" style={{ width: '148mm', padding: '8mm', fontSize: '10px', lineHeight: '1.2' }}>

      {/* ===== HEADER ===== */}
      <div className="header flex justify-between w-full mb-1">
        {/* Left Side: Logo + Subtitle */}
        <div className="left-block" style={{ width: '240px' }}>
        <div
            className="logo-block font-bold"
            style={{
                fontSize: '16px',
                lineHeight: '1.2',
                border: '2px solid #000', // black box
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '6px 0',
            }}
            >
            MUSCAT<br />BULLION
            </div>

          <div className="subtitle mt-1" style={{ fontSize: '10px', lineHeight: '1.2' }}>
            <div><strong>Sale of Gold & Silver Bullion</strong></div>
            <div><strong>بيع سبائك الذهب والفضة</strong></div>
          </div>
        </div>

        {/* Right Side: Company Block */}
        <div className="company-block text-left" style={{ fontSize: '9px', lineHeight: '1.2' }}>
          <div>MUSCAT BULLION L.L.C</div>
          <div>سبائك مسقط ش.م.م</div>
          <div>Shop No 1013,Way No.1423,Muttrah Gold Souq</div>
          <div>المحل رقم 1013، الطريق رقم 1423، سوق مطرح للذهب</div>
          {/* <div>{shop.address}</div>
          <div>{shop.address_ar}</div>  */}
          <div>P.O Box: 3062, PC:112, Ruwi, Sultanate of Oman</div>
          <div>ص.ب.: 3062، الرمز البريدي: 112، روي، سلطنة عمان</div>
          <div>www.muscatbullion.com</div>
          <div>VATIN: OM1100325835</div>
          <div><strong>Tel: +968 24837434</strong></div>
        </div>
      </div>

      {/* ===== TITLE ===== */}
      <div className="title" style={{ fontSize: '11px', fontWeight: 'bold', margin: '4px 0' }}>
        TAX INVOICE | فاتورة ضريبية
      </div>
      <p style={{ fontSize: '10px', margin: '2px 0' }}>To.</p>

      {/* ===== CUSTOMER + INVOICE ===== */}
      <div className="info-section flex justify-between w-full mb-1">

        {/* Customer Box */}
        <table className="customer-box border border-black border-collapse" style={{ fontSize: '9px', width: '49%' }}>
          <tbody>
            <tr><td colSpan="2" className="p-1 fw-bold"><b>{customer.name}</b></td></tr>
            <tr><td className="p-1">Address | عنوان</td><td className="p-1">{customer.address}</td></tr>
            <tr><td className="p-1">Telephone No. | رقم الهاتف</td><td className="p-1">{customer.phone}</td></tr>
            <tr><td className="p-1">C/O | شخص مسؤول</td><td className="p-1">{customer.name}</td></tr>
            <tr><td className="p-1">CR/ID No. | الرقم المدني/ رقم السجل</td><td className="p-1">{customer.civilId}</td></tr>
            <tr><td className="p-1">Customer Description | وصف العميل</td><td className="p-1">bank transfer</td></tr>
          </tbody>
        </table>

        {/* Invoice Box */}
        <table className="invoice-box border border-black border-collapse" style={{ fontSize: '9px', width: '49%' }}>
          <tbody>
            <tr><td className="p-1">Invoice No | رقم الفاتورة</td><td className="p-1">{invoice.invoiceNumber}</td></tr>
            <tr><td className="p-1">Date | تاريخ</td><td className="p-1">{invoice.invoiceDate}</td></tr>
            <tr><td className="p-1">Prepared By | أُعدت بواسطة</td><td className="p-1">{name}</td></tr>
            <tr><td className="p-1">Branch | فرع</td><td className="p-1">{shop.name}</td></tr>
            <tr><td className="p-1">Customer Type | نوع العميل</td><td className="p-1">{customer.type}</td></tr>
          </tbody>
        </table>

      </div>

      {/* ===== ITEMS TABLE ===== */}

<table
  className="items border border-black border-collapse w-full mb-1"
  style={{ fontSize: "9px" }}
>
  <thead style={{ backgroundColor: "#e5e5e5" }}>
    <tr>
      <th className="p-1 border border-black">No</th>
      <th className="p-1 border border-black">Item Description</th>
      <th className="p-1 border border-black">PCS</th>
      <th className="p-1 border border-black">Purity</th>
      <th className="p-1 border border-black">Pure Wt</th>
      <th className="p-1 border border-black">Value</th>
      <th className="p-1 border border-black">Premium</th>
      <th className="p-1 border border-black">Amount (OMR)</th>
    </tr>
  </thead>

  <tbody>
    {/* Dynamic Items */}
    {items.map((item, i) => (
      <tr key={i}>
        <td className="p-1 border border-black">{i + 1}</td>
        <td className="p-1 border border-black">{item.itemId?.name}</td>
        <td className="p-1 border border-black">{item.quantity}</td>
        <td className="p-1 border border-black">{item.purity}</td>
        <td className="p-1 border border-black">{item.weight}</td>
        <td className="p-1 border border-black">{item.price}</td>
        <td className="p-1 border border-black">{item.premium}</td>
        <td className="p-1 border border-black">{item.total}</td>
      </tr>
    ))}

    {/* Empty rows to maintain height */}
    {Array.from({ length: emptyRows }).map((_, i) => (
      <tr key={"empty" + i}>
        <td className="p-1 border border-black">&nbsp;</td>
        <td className="p-1 border border-black"></td>
        <td className="p-1 border border-black"></td>
        <td className="p-1 border border-black"></td>
        <td className="p-1 border border-black"></td>
        <td className="p-1 border border-black"></td>
        <td className="p-1 border border-black"></td>
        <td className="p-1 border border-black"></td>
      </tr>
    ))}

    {/* Totals */}
    <tr>
      <td colSpan="2" className="p-1 border border-black text-start">Sub Total</td>
      <td className="p-1 border border-black">{invoice.totalQuantity}</td>
      <td className="p-1 border border-black"></td>
      <td className="p-1 border border-black">{invoice.totalWeight}</td>
      <td className="p-1 border border-black">{invoice.subTotal}</td>
      <td className="p-1 border border-black">0</td>
      <td className="p-1 border border-black">{invoice.subTotal}</td>
    </tr>

    <tr>
      <td colSpan="5" className="p-1 border border-black text-start">VAT (5%) On Workmanship | ضريبة القيمة المضافة (٥٪) على المصنعية</td>
      <td className="p-1 border border-black">5%</td>
      <td className="p-1 border border-black"></td>
      <td className="p-1 border border-black">0.000</td>
    </tr>

    <tr style={{ backgroundColor: "#e5e5e5" }}>
      <td colSpan="7" className="p-1 border border-black text-start" >Totals</td>
      <td className="p-1 border border-black">{invoice.total}</td>
    </tr>

    <tr>
      <td colSpan="7" className="p-1 border border-black text-start">Discount</td>
      <td className="p-1 border border-black">{invoice.discount}</td>
    </tr>

    <tr style={{ backgroundColor: "#e5e5e5" }}>
      <td colSpan="7" className="p-1 border border-black font-bold" >
        Total Amount Due
      </td>
      <td className="p-1 border border-black font-bold">{invoice.finalTotal}</td>
    </tr>
  </tbody>
</table>

      {/* ===== NOTES ===== */}
      <table className="notes border border-black border-collapse w-full mb-1" style={{ fontSize: '9px',width: '100%' }}>
        <tbody>
          <tr>
            <td rowSpan={2} className="font-semibold align-top p-1 border border-black">Notes</td>
            <td className="p-1 border border-black">bank transfer 500/300 sajid mobile</td>
          </tr>
          <tr>
            <td className="p-1 border border-black">1900 visa</td>
          </tr>
        </tbody>
      </table>

      {/* ===== REMARKS ===== */}
      <div className="remarks mb-1" style={{ fontSize: '9px' }}>
        Remarks: 2000.000 24K Grams &nbsp;&nbsp; SALE @ 1.350 OMR Per Gram
      </div>

      {/* ===== TERMS ===== */}
      <table className="w-full border border-black border-collapse mb-1" style={{ fontSize: '9px' }}>
        <tbody>
          <tr>
            <td className="w-1/2 p-1 align-top">
              I hereby confirm above information to cash declaration has been completed accurately to best of my knowledge and belief with Anti-Money Laundering and Combating the Financing of Terrorism policy of Central Bank Of Oman with specific regards being made to the know your customer / due diligence procedures contained therein.
            </td>
            <td className="w-1/2 p-1 align-top" dir="rtl">
              أؤكد من خلال خبرتي أن المعلومات المذكورة أعلاه للإقرار النقدي قد تم استكمالها بدقة وفقًا لمعرفتي واعتقادي مع سياسة مكافحة غسل الأموال ومكافحة تمويل الإرهاب التي يتبعها البنك المركزي العماني مع اعتبارات محددة بشأن معرفة عميلك / إجراءات العناية الواجبة الواردة فيها.
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== SIGNATURES ===== */}
      <div>
        <span>Confirmed for & Behalf of |  تم التأكيد نيابة عن     </span><br />
        <strong>{customer.name}</strong>
      </div>
      
      <div className="signatures flex justify-between mt-2">
        <div className="text-center w-1/3">
          <hr className="border-black" />
          <span className="block mt-1 text-sm">Customer Name & Signature</span>
        </div>
        <div className="text-center w-1/3">
          <hr className="border-black" />
          <span className="block mt-1 text-sm">Checked By</span>
        </div>
        <div className="text-center w-1/3">
          <hr className="border-black" />
          <span className="block mt-1 text-sm">Authorized Signatory</span>
        </div>
      </div>

    </div>
  );
}

export default InvoiceTemplate;