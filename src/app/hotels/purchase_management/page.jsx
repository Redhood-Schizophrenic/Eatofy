'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaEye, FaXmark } from "react-icons/fa6";

export default function Purchase_management() {

  const [isLoading, setLoading] = useState(false);
  const [displayStock, setDisplayStock] = useState(false);
  const [showtableform, setShowTableForm] = useState(false);
  const [filterbydate, setfilterbydate] = useState('');
  const [invoicedate, setinvoicedate] = useState('');
  const [invoiceNo, setinvoiceNo] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const [balance_amount, setbalance_amount] = useState(0);
  const [total_amount, settotal_amount] = useState(0);
  const [payment_mode, setpayment_mode] = useState('');
  const [fetchedsupplier, setsupplier] = useState([]);
  const [fetchedpurchase, setfetchedpurchase] = useState([]);
  const [fetcheditems, setfetcheditems] = useState([]);
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [stockDetails, setStockDetails] = useState([]);
  const [newStockItem, setNewStockItem] = useState({ item_id: '', quantity: '', unit: '' });
  const [invoice, setInvoice] = useState({});
  const [Stock, setStock] = useState([]);

  // Array of Stocks
  const addStockDetail = () => {
    if (newStockItem.item_id && newStockItem.quantity && newStockItem.unit) {
      setStockDetails([...stockDetails, newStockItem]);
      setNewStockItem({ item_id: '', quantity: '', unit: '' });
    }
  };
  // Fetch Values 
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setfetchedpurchase(data.output[0].Invoices);
        setsupplier(data.output[0].Suppliers);
        setfetcheditems(data.output[0].Items);
      } else {
        console.log("Failed to fetch supplier");
      }

    } catch (e) {
      throw console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // Add Purchase
  const handlePurchase = async (e) => {
    e.preventDefault();

    const supplier_id = sessionStorage.getItem('supplier_id');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'supplier_id': supplier_id,
          'invoice_date': invoicedate,
          'invoice_no': invoiceNo,
          'payment_status': paymentstatus,
          'payment_mode': payment_mode,
          'total_amount': total_amount,
          'balance_amount': balance_amount,
          'stock_data': stockDetails
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setShowTableForm(false);
      } else {
        console.log("Failed to add purchase");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  // Filter 
  const handleFilterbydate = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/invoices/management/fetch/invoice_date`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'invoice_date': filterbydate
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log('bydate', data);
        setfetchedpurchase(data.output);
      } else {
        console.log('Failed to get by date');
      }

    } catch (e) {
      throw console.error(e);
    }
  }


  // Display purchase info
  const displayPurchasedStock = async (invoice_info) => {

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/stock/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'invoice_id': invoice_info.id
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setStock(data);
      } else {
        console.log('Failed to get by date');
      }

    } catch (e) {
      throw console.error(e);
    }

    setDisplayStock(true);
    setInvoice(invoice_info);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HotelSideNav />
      {
        isLoading
          ?
          <div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
          :
          <div className="ml-[70px]">
            <h2 className="w-full text-center pt-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Purchase Management</h2>
            <div className="text-right">
              <button onClick={() => { setShowTableForm(!showtableform) }} className="text-xl bg-red-500 text-white px-4 py-2 rounded-lg m-4 text-right">
                Add Purchase
              </button>
            </div>

            {showtableform ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-1/2 relative">
                  <button
                    onClick={() => { setShowTableForm(!showtableform) }}
                    className="absolute top-2 right-2 p-4 text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700"
                  >
                    <FaXmark size={20} />
                  </button>
                  <h2 className="text-2xl font-bold text-red-500 mb-4">Add a Purchase</h2>
                  <form onSubmit={handlePurchase}>
                    <div className="mb-4 flex gap-4 items-center">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="supplier"> Supplier Name </label>
                      <select id="supplier" name="supplier" className="rounded-lg" required>
                        <option value="">--- Select ---</option>
                        {
                          fetchedsupplier.map((items) => (
                            <option
                              key={items.id}
                              value={items.id}
                              onClick={
                                () => {
                                  sessionStorage.setItem('supplier_id', items.id)
                                }
                              }
                            >{items.SupplierName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="w-full my-4 bg-zinc-200 p-4 font-bold">
                      <span>Invoice Details</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <div className="w-full">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Category"
                          >
                            Invoice Date
                          </label>
                          <input
                            type="date"
                            id="invoicedate"
                            value={invoicedate}
                            onChange={
                              (e) => {
                                setinvoicedate(e.target.value);
                              }
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Category"
                          >
                            Total amount
                          </label>
                          <input
                            type="text"
                            id=""
                            value={total_amount}
                            onChange={
                              (e) => {
                                settotal_amount(Number(e.target.value));
                              }
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Category"
                          >
                            Balance Amount
                          </label>
                          <input
                            type="text"
                            id=""
                            value={balance_amount}
                            onChange={
                              (e) => {
                                setbalance_amount(Number(e.target.value))
                              }
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Category"
                          >
                            Payment mode
                          </label>
                          <input
                            type="text"
                            id=""
                            value={payment_mode}
                            onChange={
                              (e) => {
                                setpayment_mode(e.target.value);
                              }
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex gap-6">
                      <div className="mb-4 flex flex-col w-1/2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="paymentstatus"
                        >
                          Payment Status
                        </label>
                        <select
                          id="payment status"
                          name="status"
                          className="rounded-lg"
                          value={paymentstatus}
                          onChange={
                            (e) => {
                              setpaymentstatus(e.target.value);
                            }
                          }
                          required
                        >
                          <option value="">--- Select ---</option>
                          <option value="Paid">Paid</option>
                          <option value="Part-Paid">Part-Paid</option>
                          <option value="Due">Due</option>
                        </select>
                      </div>
                      <div className="mb-4 w-1/2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="invoice_no"
                        >
                          Invoice No.
                        </label>
                        <input
                          type="text"
                          id=""
                          value={invoiceNo}
                          onChange={
                            (e) => {
                              setinvoiceNo(e.target.value);
                            }
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>

                    </div>
                    <div className="w-full my-4 bg-zinc-200 p-4 font-bold">
                      <span>Stock Details</span>
                    </div>
                    <div className="mb-4">
                      <table className="min-w-full bg-white text-center">
                        <thead>
                          <tr className="bg-red-500 text-white">
                            <th className="py-2 border border-white">Item</th>
                            <th className="py-2 border border-white">Quantity</th>
                            <th className="py-2 border border-white">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stockDetails.map((detail, index) => (
                            <tr key={index} className="bg-zinc-100 text-black">
                              <td className="py-2">
                                {fetcheditems.find((item) => item.id === detail.item_id)?.ItemName || 'N/A'}
                              </td>
                              <td className="py-2 border border-white">{detail.quantity}</td>
                              <td className="py-2 border border-white">{detail.unit}</td>
                            </tr>
                          ))}
                          <tr>
                            <td>
                              <select
                                id="newItem"
                                name="newItem"
                                className="rounded-lg w-full"
                                value={newStockItem.item_id}
                                onChange={(e) => setNewStockItem({ ...newStockItem, item_id: e.target.value })}
                              >
                                <option value="">--- Select ---</option>
                                {fetcheditems.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.ItemName}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={newStockItem.quantity}
                                onChange={(e) => setNewStockItem({ ...newStockItem, quantity: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={newStockItem.unit}
                                onChange={(e) => setNewStockItem({ ...newStockItem, unit: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={addStockDetail}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Purchase
                    </button>
                  </form>
                </div>
              </div>
              :
              <div className="hidden"></div>
            }

            <div className="w-full px-4">
              <form
                onSubmit={handleFilterbydate}
                className="flex gap-6 justify-start items-end"
              >
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Category"
                  >
                    Invoice date
                  </label>
                  <input
                    type="date"
                    id="filterbydate"
                    value={filterbydate}
                    onChange={
                      (e) => {
                        setfilterbydate(e.target.value);
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="inline-flex items-end">
                  <button className="bg-black p-2 text-white rounded-lg">Search</button>
                </div>
              </form>
            </div>
            <div className="w-full p-4">
              <table className="table-fixed w-full p-2">
                <thead className="bg-red-500 text-white">
                  <tr className="font-bold text-left">
                    <th className="p-4">From</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Balance(amt)</th>
                    <th className="p-4">Payment mode</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Invoice Date</th>
                    <th className="p-4"></th>
                    {/*<th>QTY</th>*/}
                  </tr>
                </thead>
                <tbody className="bg-zinc-100">
                  {
                    fetchedpurchase.map((items, index) => (
                      <tr key={index} className="text-left">
                        <td className="p-3">{items.Suppliers.SupplierName}</td>
                        <td className="p-3">{items.TotalAmount}</td>
                        <td className="p-3">{items.BalanceAmount}</td>
                        <td className="p-3">{items.PaymentMode}</td>
                        <td className="p-3 inline-flex justify-center items-center">
                          <div className={`px-4 p-2`}>{items.PaymentStatus}</div>
                        </td>
                        <td className="p-3">{items.Date}</td>
                        <td className="p-3">
                          <button
                            onClick={() => { displayPurchasedStock(items) }}
                          >
                            <FaEye size={25} />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      }
      {
        displayStock
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 w-[60dvw] rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl text-red-500 font-bold"> Purchase Invoice </h3>
                <div>
                  <button
                    onClick={() => { setDisplayStock(false) }}
                    className="text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700 p-4"
                  >
                    <FaXmark size={30} />
                  </button>
                </div>
              </div>
              <div>

                <h3 className="bg-zinc-200 text-black font-bold p-2 text-center"> Invoice Details </h3>
                <div className="flex justify-center items-center mb-6 mt-4">
                  <p className="text-xl font-medium">{invoice.Suppliers.SupplierName}</p>
                </div>
                <div className="p-4 flex justify-between mb-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Invoice No: </h1>
                    <p>#{invoice.InvoiceNo}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Invoice Date: </h1>
                    <p>{invoice.Date}</p>
                  </div>
                </div>
                <div className="p-4 flex justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Total Amount: </h1>
                    <p>Rs. {invoice.TotalAmount}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Balance Amount: </h1>
                    <p>Rs. {invoice.BalanceAmount}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Payment Mode: </h1>
                    <p>{invoice.PaymentMode}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Payment Status: </h1>
                    <p>{invoice.PaymentStatus}</p>
                  </div>
                </div>
                <h3 className="bg-zinc-200 text-black font-bold p-2 text-center"> Stocks Purchased </h3>
                <div className="pt-4">
                  <table className="min-w-full text-center">
                    <thead>
                      <tr className="bg-zinc-600 text-gray-200">
                        <th className="py-2 border border-white">Item</th>
                        <th className="py-2 border border-white">Quantity</th>
                        <th className="py-2 border border-white">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Stock.output.map((stock, index) => (
                          <tr className="bg-zinc-200 text-black" key={index}>
                            <td className="py-2 border border-white">{stock.Items.ItemName}</td>
                            <td className="py-2 border border-white">{stock.Quantity}</td>
                            <td className="py-2 border border-white">Rs. {stock.Unit}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="hidden"></div>
      }
    </>
  )
}
