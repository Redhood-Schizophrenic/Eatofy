'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaXmark } from "react-icons/fa6";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { MdOutlineEdit } from 'react-icons/md';
import Link from 'next/link';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function Purchase_management() {

  const [isLoading, setLoading] = useState(false);
  const [displayStock, setDisplayStock] = useState(false);
  const [showtableform, setShowTableForm] = useState(false);
  const [showeditform, setShowEditForm] = useState(false);
  const [isFormValid, setisFormValid] = useState(true)
  const [filterbydate, setfilterbydate] = useState('');
  const [invoice_id, setinvoice_id] = useState('');
  const [invoicedate, setinvoicedate] = useState('');
  const [invoiceNo, setinvoiceNo] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const [balance_amount, setbalance_amount] = useState(0);
  const [total_amount, settotal_amount] = useState(0);
  const [payment_mode, setpayment_mode] = useState('');
  const [fetchedsupplier, setsupplier] = useState([]);
  const [fetchedpurchase, setfetchedpurchase] = useState([]);
  const [fetcheditems, setfetcheditems] = useState([]);
  const [hotel_id, sethotel_id] = useState('');
  const [supplier_id, setsupplier_id] = useState('');
  const [stockDetails, setStockDetails] = useState([]);
  const [newStockItem, setNewStockItem] = useState({ item_id: '', quantity: '0', unit: '', per_price: '0', total_price: '0' });
  const [invoice, setInvoice] = useState({});
  const [Stock, setStock] = useState([]);

  // Array of Stocks
  const addStockDetail = () => {
    if (newStockItem.item_id && newStockItem.quantity && newStockItem.unit && newStockItem.per_price) {
      const totalPrice = newStockItem.quantity * newStockItem.per_price;
      setStockDetails([...stockDetails, { ...newStockItem, total_price: totalPrice }]);
      setNewStockItem({ item_id: '', quantity: '', unit: '', per_price: '', total_price: '' });
    }
  };

  // Reset Values
  const reset_values = () => {
    setinvoicedate('');
    setinvoiceNo('');
    setpaymentstatus('');
    setbalance_amount(0);
    settotal_amount(0);
    setpaymentstatus('');
    setpayment_mode('');
    setsupplier_id('');
    setNewStockItem({ item_id: '', quantity: '0', unit: '', per_price: '0', total_price: '0' });
    setStockDetails([]);
  }

  const statusChangeHandler = (e) => {
    e.preventDefault();
    const selectedStatus = e.target.value;
    let newBalanceAmount = balance_amount;

    if (selectedStatus === 'Paid') {
      newBalanceAmount = 0;
    }
    else if (selectedStatus === 'Part-paid') {
      if (balance_amount === 0) {
        alert('Balance cannot be zero');
        setisFormValid(false);
        return;
      }
    }
    else if (selectedStatus === 'Unpaid') {
      newBalanceAmount = total_amount;
      setpayment_mode('None');
    }

    setpaymentstatus(selectedStatus);
    setbalance_amount(newBalanceAmount)
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
        alert("Failed to fetch supplier");
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
          'total_amount': parseFloat(total_amount),
          'balance_amount': parseFloat(balance_amount),
          'stock_data': stockDetails
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        reset_values();
        setShowTableForm(false);
        await fetchData();
      } else {
        alert("Failed to add purchase");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  // Invoice Payment
  const handleSettleBill = async () => {
    if (isFormValid) {
      try {

        const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/invoices/management/update/payment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'invoice_id': invoice_id,
            'balance_amount': balance_amount,
            'payment_mode': payment_mode,
            'payment_status': paymentstatus
          }),
        });

        if (response.status === 200) {
          setShowEditForm(false);
          fetchData();
        } else {
          alert('Payment Failed');
        }

      } catch (e) {
        throw console.error(e);
      }
    }
    else {
      alert("Please Follow Instructions Properly")
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
        setfetchedpurchase(data.output);
      } else {
        alert('Failed to get by date');
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
        alert('Failed to get by date');
      }

    } catch (e) {
      throw console.error(e);
    }

    setDisplayStock(true);
    setInvoice(invoice_info);
  }

  useEffect(() => {
    sethotel_id(sessionStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchData();
    }
  }, [hotel_id]);

  return (
    <>
      <HotelSideNav />
      {
        <div className="ml-[70px]">
          <h2 className="w-full text-center pt-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Purchase Management</h2>
          <div className="text-right">
            <button onClick={() => { setShowTableForm(!showtableform) }} className="text-xl bg-red-500 text-white px-4 py-2 rounded-lg m-4 text-right">
              Add Purchase
            </button>
          </div>

          {
            showeditform ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-1/2 relative">
                  <button
                    onClick={() => { reset_values(); setShowEditForm(false) }}
                    className="absolute top-2 right-2 p-4 text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700"
                  >
                    <FaXmark size={20} />
                  </button>
                  <h2 className="text-2xl font-bold text-red-500 mb-4">Update Payment</h2>
                  <h3 className="text-red-500 pt-2"> *Current values are vulnerable after updating please do check the bill first  before payment</h3>

                  <div className="w-full mt-6">
                    <div className="bg-gray-200 w-full h-1 rounded-2xl"></div>
                    <div className="w-full flex flex-col justify-center items-center p-4 gap-6">
                      <div className="text-lg flex w-full gap-2">
                        <h1 className="font-bold">Previous Bill Amount:</h1>
                        <label htmlFor="TotalAmt" className=""> Rs. {total_amount | 0} </label>
                      </div>
                      <div className="w-full flex justify-between">
                        <div id="balance" className="flex flex-col gap-2">
                          <label htmlFor="balance" className="font-bold"> Balance Amount </label>
                          <input
                            type="number"
                            value={balance_amount | 0}
                            className="rounded-lg"
                            onChange={(e) => { setbalance_amount(parseFloat(e.target.value)) }}
                            required
                          />
                        </div>
                        <div id="payment_mode" className="flex flex-col gap-2">
                          <label htmlFor="payment_mode" className="font-bold"> Payment Mode </label>
                          <select
                            name="payment_mode"
                            className="rounded-lg"
                            value={payment_mode}
                            onChange={(e) => setpayment_mode(e.target.value)}
                            required
                          >
                            <option value="">--Select--</option>
                            <option value="None">None</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Credit-card">Credit-card</option>
                          </select>
                        </div>
                        <div id="payment_status" className="flex flex-col gap-2">
                          <label htmlFor="payment_status" className="font-bold">Payment Status</label>
                          <select
                            name="payment_status"
                            className="rounded-lg"
                            value={paymentstatus}
                            onChange={statusChangeHandler}
                            required
                          >
                            <option value="">--Select--</option>
                            <option value="Booked">Booked</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Part-paid">Part-paid</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex w-full pt-6 gap-6">
                        <button
                          onClick={handleSettleBill}
                          className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => { reset_values(); setShowEditForm(false); }}
                          className="bg-gray-500 text-white font-bold px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : ''
          }

          {
            showtableform ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-scroll pt-2">
                <div className="bg-white p-6 rounded-lg w-[80%] relative">
                  <button
                    onClick={() => { reset_values(); setShowTableForm(!showtableform) }}
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
                                (e) => {
                                  setsupplier_id(e.target.value)
                                }
                              }
                            >{items.SupplierName}</option>
                          ))
                        }
                      </select>
                      <Link href={`${ApiHost}/hotels/backoffice/supplier_management`}>
                        <IoIosAddCircleOutline size={28}/>
                      </Link>
                    </div>
                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <div id='Invoice Details' className=''>
                          <div className="w-full my-4 bg-zinc-200 p-4 font-bold">
                            <span className='text-md'>Invoice Details</span>
                          </div>
                          <div className="flex items-center justify-between gap-6">
                            <div className="w-full">
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 font-bold mb-2"
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
                                  className="block text-gray-700 font-bold mb-2"
                                  htmlFor="Category"
                                >
                                  Total amount
                                </label>
                                <input
                                  type="text"
                                  id="total_amount"
                                  value={total_amount}
                                  onChange={(e) => {
                                    settotal_amount(e.target.value);
                                  }}
                                  placeholder="0.00"
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  required
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 font-bold mb-2"
                                  htmlFor="Category"
                                >
                                  Payment Mode
                                </label>
                                <select id="payment_mode" name="payment_mode" value={payment_mode} onChange={(e) => setpayment_mode(e.target.value)} className="rounded-lg w-full" required>
                                  <option value="">--- Select ---</option>
                                  <option value="Cash">Cash</option>
                                  <option value="Credit">Credit</option>
                                  <option value="UPI">UPI</option>
                                </select>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Category"
                                >
                                  Invoice No.
                                </label>
                                <input
                                  type="text"
                                  id="invoiceNo"
                                  value={invoiceNo}
                                  onChange={(e) => {
                                    setinvoiceNo(e.target.value);
                                  }}
                                  placeholder="Invoice No."
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  required
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Category"
                                >
                                  Balance amount
                                </label>
                                <input
                                  type="text"
                                  id="balance_amount"
                                  value={balance_amount}
                                  onChange={(e) => {
                                    setbalance_amount(e.target.value);
                                  }}
                                  placeholder="0.00"
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  required
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Category"
                                >
                                  Payment Status
                                </label>
                                <select id="paymentstatus" name="paymentstatus" value={paymentstatus} onChange={statusChangeHandler} className="rounded-lg w-full" required>
                                  <option value="">--- Select ---</option>
                                  <option value="Paid">Paid</option>
                                  <option value="Unpaid">Unpaid</option>
                                  <option value="Part-paid">Part-paid</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div id='Stock Items'>

                          <div className="w-full my-4 bg-zinc-200 p-4 font-bold">
                            <span>Stock Items</span>
                          </div>

                          <div className="flex gap-4">
                            <div>

                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Item"
                                >
                                  Item
                                </label>
                                <select value={newStockItem.item_id} onChange={(e) => setNewStockItem({ ...newStockItem, item_id: e.target.value })} className="rounded-lg w-full">
                                  <option value="">--- Select Item ---</option>
                                  {fetcheditems.map((item) => (
                                    <option key={item.id} value={item.id}>{item.ItemName}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Quantity"
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  value={newStockItem.quantity}
                                  onChange={(e) => setNewStockItem({ ...newStockItem, quantity: e.target.value })}
                                  placeholder="Quantity"
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                />
                              </div>
                            </div>

                            <div>
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Unit"
                                >
                                  Unit
                                </label>
                                <select value={newStockItem.unit} onChange={(e) => setNewStockItem({ ...newStockItem, unit: e.target.value })} className="rounded-lg w-full">
                                  <option value="">--- Unit ---</option>
                                  <option value="kg">Kg</option>
                                  <option value="Litre">Litre</option>
                                  <option value="Dozen">Dozen</option>
                                </select>
                              </div>

                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Per_Unit_Price"
                                >
                                  Per Unit Price
                                </label>
                                <input
                                  type="number"
                                  value={newStockItem.per_price}
                                  onChange={(e) => setNewStockItem({ ...newStockItem, per_price: e.target.value })}
                                  placeholder="Per Price"
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="Total_Price"
                                >
                                  Total Price
                                </label>
                                <input
                                  type="text"
                                  value={`${newStockItem.quantity * newStockItem.per_price || ''}`}
                                  placeholder="Total Price"
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  readOnly
                                />
                              </div>

                              <div className='mt-11'>
                                <button type="button" onClick={addStockDetail} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='w-1/2'>
                        <table className="w-full mt-4 border">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="p-2 border">Item</th>
                              <th className="p-2 border">Quantity</th>
                              <th className="p-2 border">Unit</th>
                              <th className="p-2 border">Per Price</th>
                              <th className="p-2 border">Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stockDetails.map((stock, index) => (
                              <tr key={index}>
                                <td className="p-2 border">{fetcheditems.find(item => item.id === stock.item_id)?.ItemName}</td>
                                <td className="p-2 border">{stock.quantity}</td>
                                <td className="p-2 border">{stock.unit}</td>
                                <td className="p-2 border">{stock.per_price}</td>
                                <td className="p-2 border">{stock.total_price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-4">
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Purchase</button>
                      <button type="reset" onClick={() => { reset_values(); setShowTableForm(false) }} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              </div> : ''
          }
          <div className="w-full px-4">
            <form
              onSubmit={handleFilterbydate}
              className="flex gap-6 justify-start items-end"
            >
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <div>
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
                </div>
                <div className="inline-flex items-end">
                  <button className="bg-black p-2 text-white rounded-lg">Search</button>
                </div>
              </div>

            </form>
          </div>

          <div className='w-full p-4'>

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
                        <div className='flex gap-2 justify-center items-center '>
                          <button
                            onClick={() => { displayPurchasedStock(items) }}
                          >
                            <FaEye size={25} />
                          </button>
                          <button
                            onClick={() => {
                              setinvoice_id(items.id);
                              setbalance_amount(items.BalanceAmount);
                              settotal_amount(items.TotalAmount);
                              setpayment_mode(items.PaymentMode);
                              setpaymentstatus(items.PaymentStatus);
                              setShowEditForm(true);
                            }}
                          >
                            <MdOutlineEdit size={28} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Stock Details Modal */}
          {
            displayStock
              ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-scroll">
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
                            <th className="py-2 border border-white">Unit</th>
                            <th className="py-2 border border-white">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Stock.output.map((stock, index) => (
                              <tr className="bg-zinc-200 text-black" key={index}>
                                <td className="py-2 border border-white">{stock.Items.ItemName}</td>
                                <td className="py-2 border border-white">{stock.Quantity}</td>
                                <td className="py-2 border border-white">{stock.Unit}</td>
                                <td className="py-2 border border-white">
                                  <div className='flex flex-col'>
                                    <label htmlFor="Total Price">
                                      Rs. {stock.Price}
                                    </label>
                                    <label htmlFor="" className='text-xs text-gray-800'>
                                      ( Rs. {stock.PerPrice} per unit )
                                    </label>
                                  </div>
                                </td>
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
        </div>
      }
    </>
  );
}
