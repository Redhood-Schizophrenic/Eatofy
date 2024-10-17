"use client";

import React, { useState, useEffect } from "react";
import { ApiHost } from "@/constants/url_consts";
import HotelSideNav from "@/components/SideNavHotel";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const ExpenseTracking = () => {
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showUpdateExpenseForm, setShowUpdateExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseId, setExpenseId] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const router = useRouter();
  const [expenseDetails, setExpenseDetails] = useState({
    bearer: "",
    date: "",
    amount_payable: 0,
    amount_paid: 0,
    category: "",
    description: "",
    status: "",
    payment_mode: "",
  });
  const [hotel_id, sethotel_id] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormValid, setisFormValid] = useState(true);

  useEffect(() => {
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchExpenses();
    }
  }, [hotel_id]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `${ApiHost}/api/hotel/expenses/management/fetch`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 'hotel_id': hotel_id })
        }
      );

      const res = await response.json();

      if (res.returncode === 200) {
        setExpenses(res.output);
      } else {
        alert("Expence fetched failed");
      }

    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const statusChangeHandler = (e) => {
    e.preventDefault();
    const selectedStatus = e.target.value;
    let newAmountPayable = expenseDetails.amount_payable;

    if (selectedStatus === 'Paid') {
      newAmountPayable = 0;
    } else if (selectedStatus === 'Partpaid') {
      if (expenseDetails.amount_payable === 0) {
        alert('Balance cannot be zero');
        setisFormValid(false);
        return;
      }
    } else if (selectedStatus === 'Unpaid') {
      if (expenseDetails.amount_payable === 0) {
        alert('Balance cannot be zero');
        setisFormValid(false);
        return;
      }
    }

    setExpenseDetails(prevState => ({
      ...prevState,
      status: selectedStatus,
      amount_payable: newAmountPayable,
    }));
    setisFormValid(true);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please follow the instructions properly")
    };

    try {
      const response = await fetch(`${ApiHost}/api/hotel/expenses/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hotel_id: localStorage.getItem('hotel_id'),
          expense_name: expenseDetails.category,
          date: expenseDetails.date,
          note: expenseDetails.description,
          payable_to: expenseDetails.bearer,
          amount_payable: expenseDetails.amount_payable,
          amount_paid: expenseDetails.amount_paid,
          status: expenseDetails.status,
          payment_mode: expenseDetails.payment_mode
        })
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setShowAddExpenseForm(!showAddExpenseForm);
        fetchExpenses();
        setShowAddExpenseForm(false);
      } else {
        alert("Failed to add expense");
      }

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateParams = (expense) => {
    setExpenseId(expense.id);
    setExpenseDetails({
      bearer: expense.PayableTo,
      date: expense.Date,
      amount_payable: expense.AmountPayable,
      amount_paid: expense.AmountPaid,
      category: expense.ExpenseName,
      description: expense.Note,
      status: expense.PaymentStatus,
      payment_mode: expense.PaymentMode
    });
    setShowUpdateExpenseForm(true);
    setSelectedExpense(expense);

  }

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    if (!selectedExpense) return;

    try {
      const response = await fetch(`${ApiHost}/api/hotel/expenses/management/update/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expense_id: expenseId,
          date: expenseDetails.date,
          note: expenseDetails.description,
          payable_to: expenseDetails.bearer,
          amount_payable: expenseDetails.amount_payable,
          amount_paid: expenseDetails.amount_paid,
          status: expenseDetails.status,
          payment_mode: expenseDetails.payment_mode
        })
      });

      const data = await response.json();

      if (data.returncode === 200) {
        fetchExpenses();
        setShowUpdateExpenseForm(false);
        setSelectedExpense(null);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const totalExp = expenses.reduce((sum, total) => sum + total.AmountPaid, 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.PayableTo.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    expense.PaymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="flex h-screen flex-col md:flex-row">
      <HotelSideNav />
      <div className="flex-1 ml-[70px] p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex justify-start items-center gap-4 mb-4">
            <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
              router.back()
            }} />
            <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Expense Tracking</h2>
          </div>
          <button
            className="bg-red-500 text-white w-30 h-10 px-4 py-2 rounded font-semibold"
            onClick={() => {
              setShowAddExpenseForm(!showAddExpenseForm);
              setExpenseDetails(
                {
                  bearer: "",
                  date: "",
                  amount_payable: 0,
                  amount_paid: 0,
                  category: "",
                  description: "",
                  status: "",
                }
              )
            }}
          >
            Add Expenses
          </button>
        </div>

        <div className="mb-8 justify-between flex w-full">
          <div className="flex items-center space-y-4">
            <div className="p-4 border border-red-500 rounded-md">
              <h3 className="text-red-500 text-xl font-bold">Total Expenses</h3>
              <p className="text-xl">Rs. {totalExp}</p>
            </div>
          </div>

          <div className="w-1/3 flex items-end ">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Bearer or Payment Status..."
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>
        </div>

        {showAddExpenseForm && (
          <div className="fixed w-[100dvw] h-[100dvh] bg-black bg-opacity-40 backdrop-blur-md top-0 left-0 flex flex-col justify-center items-center">
            <div className="ml-[70px] w-full md:w-1/2 p-8 border border-red-500 rounded-lg mb-8 bg-white flex flex-col">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold mb-4 h-[100%] flex items-center">Add Expense</h3>
                <button
                  onClick={() => {
                    setShowAddExpenseForm(!showAddExpenseForm);
                  }}
                >
                  <AiOutlineCloseCircle size={35} />
                </button>
              </div>
              <form onSubmit={handleAddExpense} className="flex flex-col gap-4 my-4 w-full">
                <div className="flex justify-between w-full gap-6">
                  <div className="w-[100%] text-black font-medium flex flex-col gap-6">
                    <div className="">
                      <label className="block ">Bearer<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="eg; John Doe"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.bearer}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            bearer: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="">
                      <label className="block ">Category<span className="text-red-500">*</span></label>
                      <select
                        name="category"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.category}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            category: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Salary">Salary</option>
                        <option value="Purchases">Purchase</option>
                        <option value="Miscellaneous">Misscellaneous (Other)</option>
                      </select>
                    </div>
                    <div className="">
                      <label className="block text-black">Date<span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.date}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-[100%] text-black font-medium flex flex-col gap-6">
                    <div className="">
                      <label className="block">Balance Amount</label>
                      <input
                        type="number"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.amount_payable}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            amount_payable: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="">
                      <label className="block">Paid Amount<span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.amount_paid}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            amount_paid: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block">Payment Status<span className="text-red-500">*</span></label>
                      <select
                        name="status"
                        value={expenseDetails.status}
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        onChange={statusChangeHandler}

                      >
                        <option value="">--Select--</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partpaid">Part paid</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-full">
                    <label className="block ">Note</label>
                    <textarea
                      className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                      value={expenseDetails.description}
                      placeholder="(Optional)"
                      onChange={(e) =>
                        setExpenseDetails({
                          ...expenseDetails,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-medium block">Payment Mode<span className="text-red-500">*</span></label>
                    <select
                      name="payment_mode"
                      value={expenseDetails.payment_mode}
                      className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg text-black font-medium"
                      onChange={(e) =>
                        setExpenseDetails({
                          ...expenseDetails,
                          payment_mode: (e.target.value),
                        })
                      }

                    >
                      <option value="">--Select--</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit">Credit</option>
                    </select>
                  </div>
                </div>

                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        {showUpdateExpenseForm && selectedExpense && (
          <div className="fixed w-[100dvw] h-[100dvh] bg-black bg-opacity-40 backdrop-blur-md top-0 left-0 flex flex-col justify-center items-center">
            <div className="ml-[70px] w-full md:w-1/2 p-8 border border-red-500 rounded-lg mb-8 bg-white flex flex-col">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold mb-4 h-[100%] flex items-center">Update Expense</h3>
                <button
                  onClick={() => {
                    setShowUpdateExpenseForm(false);
                    setSelectedExpense(null);
                  }}
                >
                  <AiOutlineCloseCircle size={35} />
                </button>
              </div>
              <form onSubmit={handleUpdateExpense} className="flex flex-col gap-4 my-4 w-full">
                <div className="flex justify-between w-full gap-6">
                  <div className="w-[100%] text-black font-medium flex flex-col gap-6">
                    <div className="">
                      <label className="block ">Bearer<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="eg; John Doe"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.bearer}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            bearer: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="">
                      <label className="block ">Category<span className="text-red-500">*</span></label>
                      <select
                        name="category"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.category}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            category: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Salary">Salary</option>
                        <option value="Purchases">Purchase</option>
                        <option value="Miscellaneous">Misscellaneous (Other)</option>
                      </select>
                    </div>
                    <div className="">
                      <label className="block text-zinc-700">Date<span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.date}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-[100%] text-black font-medium flex flex-col gap-6">
                    <div className="">
                      <label className="block">Balance Amount<span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.amount_payable}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            amount_payable: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="">
                      <label className="block">Paid Amount<span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        value={expenseDetails.amount_paid}
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            amount_paid: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block">Payment Status<span className="text-red-500">*</span></label>
                      <select
                        name="status"
                        value={expenseDetails.status}
                        className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                        onChange={(e) =>
                          setExpenseDetails({
                            ...expenseDetails,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="">--Select--</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partpaid">Part paid</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-full">
                    <label className="block ">Note</label>
                    <textarea
                      className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg"
                      value={expenseDetails.description}
                      placeholder="(Optional)"
                      onChange={(e) =>
                        setExpenseDetails({
                          ...expenseDetails,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-medium block">Payment Mode<span className="text-red-500">*</span></label>
                    <select
                      name="payment_mode"
                      value={expenseDetails.payment_mode}
                      className="w-full border-b border-red-500 focus:outline-none focus:border-red-700 rounded-lg text-black font-medium"
                      onChange={(e) =>
                        setExpenseDetails({
                          ...expenseDetails,
                          payment_mode: (e.target.value),
                        })
                      }

                    >
                      <option value="">--Select--</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit">Credit</option>
                    </select>
                  </div>
                </div>

                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
          <div className="w-full">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">#SR</th>
                  <th className="border px-4 py-2">Bearer</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Amount Paid</th>
                  <th className="border px-4 py-2">Balance</th>
                  <th className="border px-4 py-2">Payment Status</th>
                  <th className="border px-4 py-2">Payment Mode</th>
                  <th className="border px-4 py-2">Note</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredExpenses.map((expense, index) => (
                    <tr className="bg-zinc-100 border-black" key={expense.id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{expense.PayableTo}</td>
                      <td className="border px-4 py-2">{expense.ExpenseName}</td>
                      <td className="border px-4 py-2">₹{expense.AmountPaid}</td>
                      <td className="border px-4 py-2">₹{expense.AmountPayable}</td>
                      <td className="border px-4 py-2">
                        <span
                          className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${expense.PaymentStatus.toLowerCase() === 'paid' ? 'bg-green-100 text-green-800' :
                            expense.PaymentStatus.toLowerCase() === 'unpaid' ? 'bg-red-100 text-red-800' :
                              expense.PaymentStatus.toLowerCase() === 'partpaid' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {expense.PaymentStatus}
                        </span>
                      </td>
                      <td className="border px-4 py-2">{expense.PaymentMode}</td>
                      <td className="border px-4 py-2">{expense.Note}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => {
                            updateParams(expense);
                          }}
                        >
                          <MdOutlineEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracking;
