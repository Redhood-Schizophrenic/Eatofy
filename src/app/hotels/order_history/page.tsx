"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Bill {
  id: string;
  table_name: string;
  waiter: string;
  customer: string;
  balance: string;
  total: string;
  type: string;
  status: string;
}

const BillTable: React.FC = () => {

  const hotel_id: any = sessionStorage.getItem('hotel_id');
  const [billList, setBillList] = useState<Bill[]>([]);

  const fetchBillList = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/bills/management/fetch/hotel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          // Map the output objects to Staff interface
          const mappedBillList = result.output.map((item: any) => ({
            id: item.id,
            table_name: item.Table.TableName ? item.Table.TableName : "N/A",
            waiter: `${item.Waiter.FirstName}  ${item.Waiter.LastName}`,
            customer: item.Customer ? item.Customer.CustomerName : "N/A",
            balance: item.BalanceAmount,
            total: item.TotalAmount,
            type: item.Type,
            status: item.Status,
          }));
          setBillList(mappedBillList);
          console.log(result)
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error("Failed to fetch bill list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBillList();
  }, []);


  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] flex-1 h-screen p-4 bg-white">
        <h2 className="text-red-500 text-3xl mb-4">Order History</h2>

        <div className="flex">
          <div className="flex-1">
            <table className="min-w-full text-black border-collapse">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">SR#</th>
                  <th className="border px-4 py-2">Table</th>
                  <th className="border px-4 py-2">Waiter</th>
                  <th className="border px-4 py-2">Customer</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Balance</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Status</th>

                </tr>
              </thead>
              <tbody>
                {billList.map((bill, index) => (
                  <tr key={bill.id} className={index % 2 === 0 ? "bg-zinc-200" : ""}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{bill.table_name}</td>
                    <td className="border px-4 py-2">{bill.waiter}</td>
                    <td className="border px-4 py-2">{bill.customer}</td>
                    <td className="border px-4 py-2">{bill.type}</td>
                    <td className="border px-4 py-2">{bill.balance}</td>
                    <td className="border px-4 py-2">{bill.total}</td>
                    <td className="border px-4 py-2">
                      {
                        bill.status === "Paid" ? (
                          <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-green-300 text-green-800 rounded-lg bg-opacity-80">
                            {bill.status}
                          </span>
                        ) : bill.status === "Active" ? (
                          <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-yellow-300 text-yellow-800 rounded-lg bg-opacity-80">
                            {bill.status}
                          </span>
                        ) : bill.status === "Unpaid" ? (
                          <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-red-300 text-red-800 rounded-lg bg-opacity-80">
                            {bill.status}
                          </span>
                        ) : (
                          <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-gray-300 text-gray-800 rounded-lg bg-opacity-80">
                            {bill.status}
                          </span>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div >
      </div >
    </>
  );
};

export default BillTable;
