import { useState } from "react";

function CreateInvoice() {

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      { name: "", weight: 0, price: 0 }
    ]);
  };

  const updateItem = (index, field, value) => {

    const newItems = [...items];
    newItems[index][field] = value;

    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_,i)=>i!==index));
  };

  const total = items.reduce(
    (sum,i)=>sum + (i.weight * i.price),
    0
  );

  return (
    <div>

      <h3>Create Invoice</h3>

      <div className="card p-3">

        <div className="row mb-3">

          <div className="col">
            <label>Customer</label>
            <input className="form-control" placeholder="Customer name"/>
          </div>

          <div className="col">
            <label>Date</label>
            <input type="date" className="form-control"/>
          </div>

        </div>

        <button
          className="btn btn-success mb-3"
          onClick={addItem}
        >
          Add Item
        </button>

        <table className="table table-bordered">

          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {items.map((item,index)=>(
              <tr key={index}>

                <td>
                  <input
                    className="form-control"
                    value={item.name}
                    onChange={(e)=>updateItem(index,"name",e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.weight}
                    onChange={(e)=>updateItem(index,"weight",e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.price}
                    onChange={(e)=>updateItem(index,"price",e.target.value)}
                  />
                </td>

                <td>
                  {item.weight * item.price}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={()=>removeItem(index)}
                  >
                    X
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        <h4 className="text-end">
          Total: ${total}
        </h4>

        <button className="btn btn-primary mt-3">
          Save Invoice
        </button>

      </div>

    </div>
  );
}

export default CreateInvoice;