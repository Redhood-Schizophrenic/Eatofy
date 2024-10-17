"use client";

import SideNav from "@/components/SideNavbar";
import Link from "next/link";
import "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { ApiHost } from "@/constants/url_consts";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Subscription() {
  const [data, setdata] = useState([]);
  const [subscription_name, setsubname] = useState("");
  const [price, setprice] = useState("");
  const [validity, setvalidity] = useState(0);
  const [sub, setSubscription] = useState([]);
  const [enddate, setenddate] = useState([]);
  const limit = sub.slice(0, 5);
  const form = useRef();
  const task = useRef();
  const route = useRouter();
  const closetoEndDate = 4;
  const [data1, setData1] = useState([]);
  const [tasks, settasks] = useState([]);
  const [tasknote, settasknote] = useState("");
  const [date, setdate] = useState("");
  const [status, setstatus] = useState("");
  const [remove, setRemove] = useState("");
  const [SubscriptionSuccess, setSubscriptionSuccess] = useState("");
  const [SubscriptionError, setSubscriptionError] = useState("");

  const dataLine = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
    datasets: [
      {
        label: "Revenues",
        data: [
          30, 32, 28, 35, 37, 38, 40, 42, 39, 41, 43, 45, 44, 43, 46, 48, 47,
          49, 51, 53, 52, 54, 55, 57, 56, 58, 60, 59, 61, 62,
        ],
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${ApiHost}/api/eatofy/subscriptions/management/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription_name: subscription_name,
            price: parseFloat(price),
            validity: validity,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setdata(data);

        if (data.returncode === 200) {
          ShowForm;
          setSubscriptionSuccess(data.message);
        } else {
          setSubscriptionError(data.message);
        }
      } else {
        setSubscriptionError("Failed to Add Subscription");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setSubscriptionError(`Error Occured: ${error}`);
    }
  }

  const fetchSubscription = async () => {
    const res = await fetch(
      `${ApiHost}/api/eatofy/subscriptions/management/fetch`
    );
    const data = await res.json();
    setSubscription(data.output);
  };

  const fetchTasksfetch = async () => {
    const res = await fetch(`${ApiHost}/api/eatofy/tasks/fetch`);
    const data = await res.json();
    settasks(data.output);
  };

  const fetchTasksadd = async (e) => {
    e.preventDefault();
    const res = await fetch(`${ApiHost}/api/eatofy/tasks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: tasknote,
        date: date,
        status: status,
      }),
    });
    const data = await res.json();
    if (data.returncode === 200) {
      task.current.classList.toggle("hidden");
    } else {
      location.reload();
    }
    setData1(data.output);
  };

  const fetchTasksedit = async () => {
    const res = await fetch(`${ApiHost}/api/eatofy/tasks/update`);
    const data = await res.json();
    setSubscription(data.output);
  };

  const fetchTasksdelete = async () => {
    const task_id = sessionStorage.getItem("task_id");

    const res = await fetch(`${ApiHost}/api/eatofy/tasks/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: task_id,
      }),
    });
    const data = await res.json();
    setRemove(data.output);
    if (data.returncode === 200) {
      route.replace("/eatofy/add/subscription");
    }
  };

  const ShowForm = () => {
    form.current.classList.toggle("hidden");
  };
  const ShowFormtaks = () => {
    task.current.classList.toggle("hidden");
  };

  const filterEndDate = async () => {
    const res = await fetch(`${ApiHost}/api/eatofy/hotel_subscription/fetch`);
    const data = await res.json();
    setenddate(data.output);
  };

  const today = new Date();
  const filteredData = enddate.filter((items) => {
    const endDate = new Date(items.EndDate);
    const diffInDays = Math.abs((endDate - today) / (1000 * 3600 * 24));
    return diffInDays <= closetoEndDate;
  });

  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <>
      <SideNav />
      <section className="ml-[60px]">
        <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-tr from-red-500 to-zinc-800 text-white">
          <div className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
              <input
                type="text"
                placeholder="Search for subscriptions, payouts, and reminders"
                className="w-full lg:w-1/2 p-2 rounded-[50px] bg-zinc-800 text-white placeholder-zinc-400"
              />
              <h2 className="bg-red-500 rounded-[50px] p-4">7 FEB 2024</h2>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Left Side */}
              <div className="lg:w-1/2 lg:pr-4">
                <div className="flex flex-row justify-between items-center mb-8 space-y-4">
                  <h1 className="text-2xl font-bold">
                    Get started with SubsManage
                  </h1>
                  <button
                    onClick={ShowForm}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg"
                  >
                    +Add Subscription
                  </button>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl mb-4">My subscriptions</h2>
                  <div className="p-4 backdrop-blur-xl w-full bg-black/30 rounded-lg">
                    <p className="mb-5 font-bold">5 active</p>
                    <div className="flex flex-col lg:flex-row justify-between mb-4 space-y-4 lg:space-y-0">
                      <div>
                        <table className="table-fixed w-full text-sm text-left rtl:text-right text-white shadow shadow-black">
                          <thead className="text-left font-bold uppercase border-b-2 border-zinc-950">
                            <tr>
                              <th className="px-4 py-4">Sr.No</th>
                              <th className="px-4 py-4">Name</th>
                              <th className="px-4 py-4">Price</th>
                              <th className="px-4 py-4">Validity</th>
                              <th className="px-4 py-4"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {limit.map((items, i) => (
                              <tr
                                className="px-4 py-4 border border-black"
                                key={items.id}
                              >
                                <td className="px-4 py-4">{++i}</td>
                                <td className="px-4 py-4">
                                  {items.SubscriptionName}
                                </td>
                                <td className="px-4 py-4">{items.Price}</td>
                                <td className="px-4 py-4">{items.Validity}</td>
                                <td className="px-4 py-4">
                                  <button
                                    onClick={() => {
                                      sessionStorage.setItem(
                                        "subscription_id",
                                        items.id
                                      );
                                      sessionStorage.setItem(
                                        "subscription_validity",
                                        items.Validity
                                      );
                                      if (
                                        sessionStorage.getItem(
                                          "subscription_id"
                                        ) === items.id &&
                                        sessionStorage.getItem(
                                          "subscription_validity"
                                        )
                                      ) {
                                        route.push(
                                          "/eatofy/add/hotel_subscription"
                                        );
                                        alert("Subscription is selected");
                                      } else {
                                        alert("subscription is not selected!!");
                                      }
                                    }}
                                  >
                                    <FaArrowRightToBracket size={25} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <button
                        className="bg-red-500 hover:bg-red-600 p-3 rounded-[50px]"
                        onClick={() => {
                          route.push("/eatofy/subscription");
                        }}
                      >
                        View all subscriptions
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-xl mb-4">Annual Subscriptions</h2>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <Line data={dataLine} className="w-full" />
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="lg:w-1/2 lg:pl-4">
                {/*<div className="flex flex-col justify-between items-center mb-8 space-y-4">
									<h2 className="text-xl">Current Month Overview</h2>
									<div className="flex space-x-4">
										<div>Jan <span className=" p-1 rounded-lg">9</span></div>
										<div className="bg-red-600 p-1 rounded-lg">Feb <span className=" p-1 rounded-lg">2</span></div>
										<div>Mar <span className=" p-1 rounded-lg">7</span></div>
										<div>Apr <span className=" p-1 rounded-lg">4</span></div>
										<div>May <span className=" p-1 rounded-lg">7</span></div>
										<div>Jun <span className=" p-1 rounded-lg">6</span></div>
									</div>
								</div>*/}

                <div className="mb-8">
                  <h2 className="text-xl mb-4">Upcoming payment this month</h2>
                  {filteredData.map((items) => (
                    <div key={items.id}>
                      <div className="backdrop-blur-xl bg-black/30 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                          <div className="bg-zinc-900 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            2
                          </div>
                          <div>
                            <p className="font-bold">{items.HotelName}</p>
                            <p className="text-zinc-400">
                              3 of 4 payments, Recharge
                            </p>
                          </div>
                          <div>10:00-11:30</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="bg-red-500 hover:bg-red-600 p-2 w-full rounded-[50px]">
                    View full list
                  </button>
                </div>
                <button
                  onClick={ShowFormtaks}
                  className="bg-black p-3 text-white rounded-lg"
                >
                  add tasks
                </button>
                <div className="bg-black/30 w-full h-[50%] my-2 p-3 rounded-lg">
                  {tasks.map((items, i) => (
                    <div
                      key={items.id}
                      className="flex items-center justify-between my-4"
                    >
                      <div className="bg-black text-white w-[30px] h-[30px] rounded-full inline-flex justify-center items-center">
                        {++i}
                      </div>
                      <div>{items.Task}</div>
                      <div>{items.Status}</div>
                      <div>{items.CompletionDate}</div>
                      <button
                        onClick={() => {
                          sessionStorage.setItem("task_id", items.id);
                          if (sessionStorage.getItem("task_id") === items.id) {
                            fetchTasksdelete();
                            setTimeout(() => {
                              location.reload();
                            }, 800);
                          }
                        }}
                        className="p-2 bg-black text-white rounded-lg"
                      >
                        delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={task}
        className="ml-[60px] hidden fixed top-0 left-0 w-full h-full text-white flex bg-white justify-center items-center bg-gradient-to-tr from-red-500 to-zinc-800 "
      >
        <form
          encType="multipart/form-data"
          method="POST"
          onSubmit={fetchTasksadd}
          className="w-[80%] bg-black bg-opacity-30 h-[80%] flex flex-col justify-center items-center gap-6 rounded-md shadow-md shadow-zinc-800"
        >
          <div className="w-[60%]">
            <label>tasks</label>
            <input
              type="text"
              className="bg-black bg-opacity-20 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="task"
              defaultValue={tasknote}
              onChange={(e) => {
                settasknote(e.target.value);
              }}
            />
          </div>
          <div className="w-[60%]">
            <label>Date</label>
            <input
              type="date"
              className="bg-black bg-opacity-20 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="date"
              defaultValue={date}
              onChange={(e) => {
                setdate(e.target.value);
              }}
            />
          </div>
          <div className="w-[60%]">
            <label>Status</label>
            <input
              type="text"
              className="bg-black bg-opacity-20 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="Status"
              defaultValue={status}
              onChange={(e) => {
                setstatus(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between items-center w-[60%] px-3 py-6 ">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-md border border-red-400"
            >
              Add tasks
            </button>
            <button
              type="button"
              onClick={ShowFormtaks}
              className="p-3 my-4 mr-4 bg-black text-white w-[100px] rounded-md"
            >
              close
            </button>
          </div>
        </form>
      </section>

      <section
        ref={form}
        className="ml-[60px] hidden fixed top-0 left-0 w-full h-full text-white flex bg-white justify-center items-center bg-gradient-to-tr from-red-500 to-zinc-800 "
      >
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="w-[80%] bg-black bg-opacity-30 h-[80%] flex flex-col justify-center items-center gap-6 rounded-md shadow-md shadow-zinc-800"
        >
          <div className="w-full flex justify-center items-center">
            <p className="text-red-500 font-bold text-3xl">
              {SubscriptionError}
            </p>
            <p className="text-green-500 font-bold text-3xl">
              {SubscriptionSuccess}
            </p>
          </div>
          <div className="w-[60%]">
            <label>Subscription Name</label>
            <input
              type="text"
              id="subscription_name"
              className="bg-black bg-opacity-20 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="Subscription"
              defaultValue={subscription_name}
              onChange={(e) => {
                setsubname(e.target.value);
              }}
            />
          </div>
          <div className="w-[60%]">
            <label>Price</label>
            <input
              type="text"
              id="price"
              className="bg-black bg-opacity-20 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="price"
              defaultValue={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </div>
          <div className="w-[60%]">
            <label>Validity</label>
            <input
              type="number"
              id="validity"
              className="bg-black bg-opacity-20 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="validity"
              defaultValue={validity}
              onChange={(e) => {
                setvalidity(e.target.valueAsNumber);
              }}
            />
          </div>
          <div className="flex justify-between items-center w-[60%] px-3 py-6 ">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-md border border-red-400"
            >
              Add subscription
            </button>
            <button
              type="button"
              onClick={ShowForm}
              className="p-3 my-4 mr-4 bg-black text-white w-[100px] rounded-md"
            >
              close
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
