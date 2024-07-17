"use client";

import React, { useState, useEffect } from "react";
import { ApiHost } from "@/constants/url_consts";

interface Expense {
  id: string;
  PaymentStatus: string;
  PayableTo: string;
  ExpenseName: string;
  AmountPayable: number;
  AmountPaid: number;
  date: string;
  description: string;
}

const ExpenseTracking: React.FC = () => {
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showUpdateExpenseForm, setShowUpdateExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [expenseDetails, setExpenseDetails] = useState({
    date: "",
    amount: 0,
    category: "",
    description: "",
    nonChargeable: false,
    status: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

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
          body: JSON.stringify({ hotel_id: sessionStorage.getItem('hotel_id') })
        }
      );

      const res = await response.json();

      if (res.returncode === 200) {
        console.log(res.output);
        setExpenses(res.output);
      } else {
        console.log("Expence fetched");
      }

    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiHost}/api/hotel/expenses/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hotel_id: sessionStorage.getItem('hotel_id'),
          expense_name: expenseDetails.category,
          date: expenseDetails.date,
          note: expenseDetails.description,
          payable_to: "Supplier",
          amount_payable: expenseDetails.amount,
          amount_paid: 0.0,
          status: expenseDetails.status
        })
      });

      const data = await response.json();

      if (data.resturncode === 200) {
        fetchExpenses();
        console.log("Expense added successfully");
        setShowAddExpenseForm(false);
      } else {
        console.log("Failed to add expence")
      }

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpense) return;

    try {
      const response = await fetch(`${ApiHost}/api/hotel/expenses/management/update/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expense_id: selectedExpense.id,
          date: expenseDetails.date,
          note: expenseDetails.description,
          payable_to: "Supplier",
          amount_payable: expenseDetails.amount,
          amount_paid: 0.0,
          status: "Unpaid"
        })
      });

      const data = await response.json();

      if (data.returncode === 200) {
        fetchExpenses();
        console.log("Expence Updated Successfully");
        setShowUpdateExpenseForm(false);
        setSelectedExpense(null);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const totalExp = expenses.reduce((sum, total) => sum + total.AmountPaid, 0);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-red-500">EATOFY</h1>
          <h2 className="text-3xl font-bold">
            Expenses <span className="text-red-500">Tracking</span>
          </h2>
        </div>

        <div className="mb-8 justify-between flex ">
          <div className="flex items-center space-y-4">
            <div className="p-4">
              <h3 className="text-purple-500 text-xl font-bold">Total Expenses</h3>
              <p className="text-xl">Rs. {totalExp}</p>
            </div>
          </div>

          <button
            className="bg-red-500 text-white w-30 h-10 px-4 py-2 rounded"
            onClick={() => setShowAddExpenseForm(!showAddExpenseForm)}
          >
            Add Expenses
          </button>
        </div>

        {showAddExpenseForm && (
          <div className="w-full md:w-1/3 p-4 border border-red-500 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Add Expenses</h3>
            <form onSubmit={handleAddExpense}>
              <div className="mb-4">
                <label className="block text-zinc-700">Date</label>
                <input
                  type="date"
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.date}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700">Amount</label>
                <input
                  type="number"
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.amount}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700">Category</label>
                <input
                  type="text"
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.category}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700">Description</label>
                <textarea
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.description}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-4 flex items-center">
                <label className="text-zinc-700">Non-Chargeable</label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={expenseDetails.nonChargeable}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      nonChargeable: e.target.checked,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <select
                  name="status"
                  value={expenseDetails.status}
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
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </form>
          </div>
        )}

        {showUpdateExpenseForm && selectedExpense && (
          <div className="w-full md:w-1/3 p-4 border border-red-500 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Update Expense</h3>
            <form onSubmit={handleUpdateExpense}>
              <div className="mb-4">
                <label className="block text-zinc-700">Date</label>
                <input
                  type="date"
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.date}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700">Amount</label>
                <input
                  type="number"
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.amount}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700">Category</label>
                <input
                  type="text"
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.category}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700">Description</label>
                <textarea
                  className="w-full border-b border-red-500 focus:outline-none focus:border-red-700"
                  value={expenseDetails.description}
                  onChange={(e) =>
                    setExpenseDetails({
                      ...expenseDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-4">
                <select
                  name="status"
                  value={expenseDetails.status}
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
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Update
              </button>
            </form>
          </div>
        )}

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
          <div className="w-full p-4 border border-red-500 rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b pb-2">#SR</th>
                  <th className="border-b pb-2">Bearer</th>
                  <th className="border-b pb-2">Category</th>
                  <th className="border-b pb-2">Amount Paid</th>
                  <th className="border-b pb-2">Balance</th>
                  <th className="border-b pb-2">Payment Status</th>
                  <th className="border-b pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense.id}>
                    <td>{index + 1}</td>
                    <td>{expense.PayableTo}</td>
                    <td>{expense.ExpenseName}</td>
                    <td>₹{expense.AmountPaid}</td>
                    <td>₹{expense.AmountPayable}</td>
                    <td>{expense.PaymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <button className="bg-red-500 text-white px-4 py-2 mt-4 w-full rounded">
              View All
            </button> */}
          </div>
        </div>

        <div className="flex space-x-4 mt-8">

        </div>
      </div>
    </div>
  );
};

export default ExpenseTracking;
