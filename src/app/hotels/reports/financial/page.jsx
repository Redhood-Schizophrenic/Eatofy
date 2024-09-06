"use client";

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaEye, FaXmark } from "react-icons/fa6";
import { fail } from "assert";

export default function Financial_Report() {
  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate() - 1);
  const from_default = weekbefore.toISOString().split("T")[0];
  const to_default = today.toISOString().split("T")[0];

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Expense-Wise
  const [Amount, setAmount] = useState([]);
  const [Dates_Filter, setDates_Filter] = useState([]);

  // Payment Status Tables
  const [Incomes, setIncomes] = useState([]);
  const [Expenses, setExpenses] = useState([]);
  const [Purchases, setPurchases] = useState([]);

  // Ui Elements
  const [displayStock, setDisplayStock] = useState(false);
  const [displaySales, setdisplaySales] = useState(true);
  const [displayPurchase, setdisplayPurchase] = useState(false);
  const [displayExpenses, setdisplayExpenses] = useState(false);
  const [PurchaseTable, setPurchaseTable] = useState([]);
  const [SalesTable, setSalesTable] = useState([]);
  const [ExpensesTable, setExpensesTable] = useState([]);
  const [hotel_id, sethotel_id] = useState("");
  const [invoice, setInvoice] = useState({});
  const [Stock, setStock] = useState([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [ProfitLoss, setProfitLoss] = useState("");
  const [ProfitLossAmt, setProfitLossAmt] = useState(0);

  // Fetch Values
  const fetchFinanceData = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/financial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotel_id: hotel_id, from: from, to: to }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setSalesTable(data.output?.Sales?.Data);
        setAmount(data.output?.Sales?.Chart?.Amount);
        setDates_Filter(data.output?.Sales?.Chart?.Category);

        // Separate tables by payment status
        setIncomes(data.output?.Sales);
        setExpenses(data.output?.Expenses);
        setPurchases(data.output?.Purchase);

        // Setting Profit or Loss
        const income = data.output?.Sales?.Amount || 0;
        const purchase = data.output?.Purchase?.Amount || 0;
        const expense = data.output?.Expenses?.Amount || 0;
        const expenditure = purchase + expense;
        if ((income > expenditure) || (income > 0 && expenditure === 0)) {
          setProfitLoss("Profit");
          const amount = income - expenditure;
          setProfitLossAmt(amount);
        } else if ((income === expenditure) || (income === 0 && expenditure === 0)) {
          setProfitLoss("Balanced");
          const amount = 0;
          setProfitLossAmt(amount);
        } else if ((income < expenditure) || (income === 0 && expenditure > 0)) {
          setProfitLoss("Loss");
          const amount = expenditure - income;
          setProfitLossAmt(amount);
        }
        else {
          setProfitLoss("Income or Expense Missing");
          setProfitLossAmt(0);
        }

      } else {
        alert("Failed to fetch supplier");
      }
    } catch (e) {
      throw console.error(e);
    }
  };

  // Display purchase info
  const displayPurchasedStock = async (invoice_info) => {
    try {
      const response = await fetch(
        `${ApiHost}/api/hotel/inventory/purchased/stock/management/fetch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoice_id: invoice_info.id,
          }),
        }
      );

      const data = await response.json();
      if (data.returncode === 200) {
        setStock(data);
      } else {
        alert("Failed to get by date");
      }
    } catch (e) {
      throw console.error(e);
    }

    setDisplayStock(true);
    setInvoice(invoice_info);
  };

  useEffect(() => {
    sethotel_id(sessionStorage.getItem("hotel_id"));
    if (hotel_id) {
      fetchFinanceData();
    }
  }, [hotel_id]);

  const dataLine = {
    labels: Dates_Filter,
    datasets: [
      {
        label: "Line",
        data: Amount,
        borderColor: "#FFA500",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#FFA500",
        pointHoverBackgroundColor: "#FFA500",
        pointBorderColor: "#FFF",
        pointHoverBorderColor: "#FFF",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the x-axis text bold
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the y-axis text bold
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the legend text bold
          },
        },
      },
    },
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold pb-6">
              Financial Reports
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex flex-col text-sm font-semibold text-zinc-700 items-center">
                <label htmlFor="from">From</label>
                <input
                  type="date"
                  id="from"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col text-sm font-semibold text-zinc-700 items-center">
                <label htmlFor="to">To</label>
                <input
                  type="date"
                  id="to"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-end pr-4 pt-6">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    fetchFinanceData();
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          {/*
Search Bar
          {displayPurchase ? (
            <div className="flex justify-start items-end w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Supplier Name or Payment Status..."
                className="px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
          ) : null}
          {displaySales ? (
            <div className="w-1/2 flex justify-end items-end">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Table, Waiter, Payment Status or Customer..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          ) : null}
          {displayExpenses ? (
            <div className="w-1/3 flex items-end ">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Bearer or Payment Status..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          ) : null}

*/}
          <div className="flex w-full mt-10 gap-4 pb-4">
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 cursor-pointer w-1/4"
              onClick={() => {
                const filteredTable = Incomes.Data.filter(
                  (bill) =>
                    bill.Table?.TableName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.Waiter.FirstName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.Waiter.LastName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.Customer?.CustomerName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.Status.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    )
                );

                setSalesTable(filteredTable);
                setAmount(Incomes?.Chart?.Amount);
                setDates_Filter(Incomes?.Chart?.Category);
                setdisplaySales(true);
                setdisplayPurchase(false);
                setdisplayExpenses(false);
              }}
            >
              <h2 className="text-zinc-500">Total Incomes</h2>
              <p className="text-2xl font-bold">Rs. {Incomes.Amount || 0}</p>
              <p className="text-sm text-zinc-500">
                {Incomes.Count || 0} Orders
              </p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer w-1/4"
              onClick={() => {
                const filteredExpenses = Expenses.Data.filter(
                  (row) =>
                    row.PayableTo.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    row.PaymentStatus.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    )
                );
                setExpensesTable(filteredExpenses);
                setAmount(Expenses?.Chart?.Amount);
                setDates_Filter(Expenses?.Chart?.Category);
                setdisplaySales(false);
                setdisplayPurchase(false);
                setdisplayExpenses(true);
              }}
            >
              <h2 className="text-zinc-500">Total Expenses</h2>
              <p className="text-2xl font-bold">Rs. {Expenses.Amount || 0}</p>
              <p className="text-sm text-zinc-500">
                {Expenses.Count || 0} Total
              </p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500 cursor-pointer w-1/4"
              onClick={() => {
                setPurchaseTable(Purchases.Data);
                setAmount(Purchases?.Chart?.Amount);
                setDates_Filter(Purchases?.Chart?.Category);
                setdisplaySales(false);
                setdisplayPurchase(true);
                setdisplayExpenses(false);
              }}
            >
              <h2 className="text-zinc-500">Total Purchases</h2>
              <p className="text-2xl font-bold">Rs. {Purchases.Amount || 0}</p>
              <p className="text-sm text-zinc-500">
                {Purchases.Count || 0} Invoices
              </p>
            </div>

            <div
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 cursor-pointer w-1/4
            ${ProfitLoss.toLowerCase() === "profit"
                  ? "text-green-800 border-green-500"
                  : ProfitLoss.toLowerCase() === "loss"
                    ? "text-red-800 border-red-500"
                    : ProfitLoss.toLowerCase() === "balanced"
                      ? "text-yellow-800 border-yellow-500"
                      : "text-gray-800 border-gray-500"
                }
              `}
            >
              <h2 className="text-zinc-500">{ProfitLoss}</h2>
              <p className="text-2xl font-bold">Rs. {ProfitLossAmt}</p>
            </div>
          </div>

          <div className="w-full flex gap-4 pt-6">
            <div className="w-full bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <div className="flex gap-20 mb-4">
                <div className="w-full mr-2">
                  <div className="w-full h-[60dvh]">
                    <Line data={dataLine} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          {displayPurchase ? (
            <div className="overflow-x-auto mt-[5dvh]">
              <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-4 w-full">
                  <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 w-full">
                    Purchases Data
                  </h2>
                </div>
                <div className=" flex justify-center items-center">
                  <table className="table-fixed w-full p-2 text-sm">
                    <thead className="bg-gray-500 text-white">
                      <tr className="font-bold text-left">
                        <th className="p-4">SR#</th>
                        <th className="p-4">Invoice Date</th>
                        <th className="p-4">From</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Balance(amt)</th>
                        <th className="p-4">Payment mode</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-zinc-100">
                      {PurchaseTable.map((items, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{items.Date}</td>
                          <td className="border px-4 py-2">
                            {items.Suppliers.SupplierName}
                          </td>
                          <td className="border px-4 py-2">
                            {items.TotalAmount}
                          </td>
                          <td className="border px-4 py-2">
                            {items.BalanceAmount}
                          </td>
                          <td className="border px-4 py-2">
                            {items.PaymentMode}
                          </td>
                          <td className="border px-4 py-2 inline-flex justify-center items-center">
                            <div className={`px-4 p-2`}>
                              <span
                                className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${items.PaymentStatus.toLowerCase() === "paid"
                                    ? "bg-green-200 text-green-800"
                                    : items.PaymentStatus.toLowerCase() ===
                                      "unpaid"
                                      ? "bg-red-200 text-red-800"
                                      : items.PaymentStatus.toLowerCase() ===
                                        "part-paid"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-gray-200 text-gray-800"
                                  }`}
                              >
                                {items.PaymentStatus}
                              </span>
                            </div>
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => {
                                displayPurchasedStock(items);
                              }}
                            >
                              <FaEye size={25} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
          {displaySales ? (
            <div className="overflow-x-auto mt-[5dvh]">
              <div className="min-w-full bg-white shadow-md rounded-lg border-l-4 border-red-500">
                <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 px-4 pt-4">
                  Sales Data
                </h2>

                <div className="p-4">
                  <table className="text-sm min-w-full text-black border-collapse">
                    <thead>
                      <tr className="bg-gray-500 text-white font-bold">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Waiter</th>
                        <th className="border px-4 py-2">Customer Name</th>
                        <th className="border px-4 py-2">Customer Contact</th>
                        <th className="border px-4 py-2">Total Amount</th>
                        <th className="border px-4 py-2">Balance Amount</th>
                        <th className="border px-4 py-2">Payment Mode</th>
                        <th className="border px-4 py-2">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SalesTable.length > 0 ? (
                        SalesTable.map((row, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-zinc-100 text-black font-light text-center text-sm"
                                : "text-center text-black font-light text-sm"
                            }
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{row.Date}</td>
                            <td className="border px-4 py-2">{row.Type}</td>
                            <td className="border px-4 py-2">
                              {row.Waiter.FirstName} {row.Waiter.LastName}
                            </td>
                            <td className="border px-4 py-2">
                              {row.Customer?.CustomerName || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                              {row.Customer?.Contact || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                              {row.TotalAmount}
                            </td>
                            <td className="border px-4 py-2">
                              {row.BalanceAmount}
                            </td>
                            <td className="border px-4 py-2">
                              {row.PaymentMode}
                            </td>
                            <td className="border px-4 py-2">
                              <span
                                className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${row.Status.toLowerCase() === "paid"
                                    ? "bg-green-200 text-green-800"
                                    : row.Status.toLowerCase() === "unpaid"
                                      ? "bg-red-200 text-red-800"
                                      : row.Status.toLowerCase() === "partpaid"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-gray-200 text-gray-800"
                                  }`}
                              >
                                {row.Status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="border px-4 py-2 text-center"
                            colSpan="8"
                          >
                            No Orders Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
          {displayExpenses ? (
            <div className="overflow-x-auto mt-[5dvh]">
              <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-4 w-full">
                  <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 w-full">
                    Expenses Data
                  </h2>
                </div>
                <div className=" flex justify-center items-center">
                  <table className="min-w-full text-sm text-black border-collapse">
                    <thead>
                      <tr className="bg-gray-500 text-white font-bold">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Bearer</th>
                        <th className="border px-4 py-2">Balance Amount</th>
                        <th className="border px-4 py-2">Paid Amount</th>
                        <th className="border px-4 py-2">Payment Mode</th>
                        <th className="border px-4 py-2">Payment Status</th>
                        <th className="border px-4 py-2">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ExpensesTable.map((row, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{row.Date}</td>
                          <td className="border px-4 py-2">
                            {row.ExpenseName}
                          </td>
                          <td className="border px-4 py-2">{row.PayableTo}</td>
                          <td className="border px-4 py-2">
                            {row.AmountPayable}
                          </td>
                          <td className="border px-4 py-2">{row.AmountPaid}</td>
                          <td className="border px-4 py-2">
                            {row.PaymentMode}
                          </td>
                          <td className="border px-4 py-2">
                            <span
                              className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${row.PaymentStatus.toLowerCase() === "paid"
                                  ? "bg-green-200 text-green-800"
                                  : row.PaymentStatus.toLowerCase() === "unpaid"
                                    ? "bg-red-200 text-red-800"
                                    : row.PaymentStatus.toLowerCase() ===
                                      "part-paid"
                                      ? "bg-yellow-200 text-yellow-800"
                                      : "bg-gray-200 text-gray-800"
                                }`}
                            >
                              {row.PaymentStatus}
                            </span>
                          </td>
                          <td className="border px-4 py-2">
                            {row.Note || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {displayStock ? (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[60dvw] rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl text-red-500 font-bold">
                {" "}
                Purchase Invoice{" "}
              </h3>
              <div>
                <button
                  onClick={() => {
                    setDisplayStock(false);
                  }}
                  className="text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700 p-4"
                >
                  <FaXmark size={30} />
                </button>
              </div>
            </div>
            <div>
              <h3 className="bg-zinc-200 text-black font-bold p-2 text-center">
                {" "}
                Invoice Details{" "}
              </h3>
              <div className="flex justify-center items-center mb-6 mt-4">
                <p className="text-xl font-medium">
                  {invoice.Suppliers.SupplierName}
                </p>
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
              <h3 className="bg-zinc-200 text-black font-bold p-2 text-center">
                {" "}
                Stocks Purchased{" "}
              </h3>
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
                    {Stock.output.map((stock, index) => (
                      <tr className="bg-zinc-200 text-black" key={index}>
                        <td className="py-2 border border-white">
                          {stock.Items.ItemName}
                        </td>
                        <td className="py-2 border border-white">
                          {stock.Quantity}
                        </td>
                        <td className="py-2 border border-white">
                          {stock.Unit}
                        </td>
                        <td className="py-2 border border-white">
                          <h2> Rs. {stock.Price}</h2>
                            <p className="text-xs text-zinc-500">Rs. {stock.PerPrice} per..</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
}
