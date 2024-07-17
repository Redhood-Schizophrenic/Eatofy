'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { Elsie } from "next/font/google";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Purchase_management() {

  const [isLoading, setLoading]:any = useState(false);
  const [showtableform, setShowTableForm] = useState(false);
  const [filterbydate, setfilterbydate] = useState('');
  const [filterbystatus, setfilterbystatus] = useState('');
  const [invoicedate, setinvoicedate] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const [balance_amount, setbalance_amount] = useState<number>(0);
  const [total_amount, settotal_amount] = useState<number>(0);
  const [payment_mode, setpayment_mode] = useState('');
  const [fetchedsupplier, setsupplier]: any = useState([]);
  const [fetchedpurchase, setfetchedpurchase]: any = useState([]);
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [isPaid, setisPaid]: any = useState('Paid');
  const [isUnpaid, setisUnpaid] = useState('Unpaid');
  const [isDue, setisDue] = useState('Due');

  const fetchSupplier = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/suppliers/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("supplier", data);
        setsupplier(data.output);
      } else {
        console.log("Failed to fetch supplier");
      }

    } catch (e: any) {
      throw console.error(e);
    }finally{
      setLoading(false);
    }
  }

  const fetchPurchase = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/invoices/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("purchase", data);
        setfetchedpurchase(data.output);
      } else {
        console.log("Failed to fetch purchase");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const fetchInvoiceDate = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/invoices/management/fetch/invoice_date`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'invoice_date': invoicedate }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("purchase", data);
        setfetchedpurchase(data.output);
      } else {
        console.log("Failed to fetch purchase");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handlePurchase = async (e: any) => {
    e.preventDefault();

    const supplier_id = sessionStorage.getItem('supplier_id');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/invoices/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'supplier_id': supplier_id,
          'invoice_date': invoicedate,
          'payment_status': paymentstatus,
          'payment_mode': payment_mode,
          'total_amount': total_amount,
          'balance_amount': balance_amount
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log('added', data);
        setShowTableForm(false);
        fetchPurchase();
      } else {
        console.log("Failed to add purchase");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleFilterbydate = async (e: any) => {
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

    } catch (e: any) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    fetchSupplier();
    fetchPurchase();
  }, []);

  console.log(paymentstatus);

  return (
    <>
      <HotelSideNav />
      {
        isLoading
          ?
          <div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
          :
          <div className="ml-[70px]">
            <div className="text-right">
              <h1 className="text-3xl text-red-500 text-center my-1 mt-6">Purchase Management</h1>
              <button onClick={() => { setShowTableForm(!showtableform) }} className="text-xl bg-red-500 p-2 rounded-lg m-4 text-right">
                Add Purchase
              </button>
            </div>

            {showtableform ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-1/2 relative">
                  <button
                    onClick={() => { setShowTableForm(!showtableform) }}
                    className="absolute top-2 right-2 p-2 text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700"
                  >
                    <FaXmark size={20} />
                  </button>
                  <h2 className="text-lg mb-4">Add a Purchase</h2>
                  <form onSubmit={handlePurchase}>
                    <div className="mb-4">
                      <select id="supplier" name="supplier" className="rounded-lg">
                        {
                          fetchedsupplier.map((items: any) => (
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
                    <div className="w-full my-4 bg-zinc-200 p-4">
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
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="paymentstatus">Payment status</label>
                      <select
                        id="payment status"
                        name="status"
                        className="rounded-lg ml-4"
                        value={paymentstatus}
                        onChange={
                          (e) => {
                            setpaymentstatus(e.target.value);
                          }
                        }
                      >
                        <option defaultChecked value="Paid">Paid</option>
                        <option value="Half-Paid">Half-Paid</option>
                        <option value="Due">Due</option>
                      </select>
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
                    {/*<th>QTY</th>*/}
                  </tr>
                </thead>
                <tbody className="bg-zinc-100">
                  {
                    fetchedpurchase.map((items: any, index:any) => (
                      <tr key={index} className="text-left">
                        <td className="p-3">{items.Suppliers.SupplierName}</td>
                        <td className="p-3">{items.TotalAmount}</td>
                        <td className="p-3">{items.BalanceAmount}</td>
                        <td className="p-3">{items.PaymentMode}</td>
                        <td className="p-3 inline-flex justify-center items-center">
                          <div className={`px-4 p-2`}>{items.PaymentStatus}</div>
                        </td>
                        <td className="p-3">{items.Date}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      }
    </>
  )
}
