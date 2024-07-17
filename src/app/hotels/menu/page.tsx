"use client"

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useReactToPrint } from 'react-to-print';

export default function Menu() {

  const [isLoading, setLoading]: any = useState(false);
  const [fetchCategorys, setfetchCategorys] = useState([]);
  const [fetchDishes, setfetchDishes]: any = useState([]);
  const [isClicked, setisClicked]: any = useState(null);
  const [ShowAll, setShowAll] = useState(true);
  const [Search, setSearch] = useState('');
  const [ShowCart, setShowCart] = useState(false);
  const [Cart, setCart] = useState<any[]>([]); // Initialize as an array
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [message, setMessage] = useState('');
  const [Orderadd, setOrderadd] = useState(false);
  const [Bill, setBill] = useState<[string, any][]>([]);
  const [ViewBill, setViewBill] = useState(false);
  const [SettleBill, setSettleBill] = useState(false);
  const [Billpaid, setBillpaid] = useState(false);
  const [discountAmt, setdiscountAmt] = useState('0');
  const [balance, setbalance] = useState(0);
  const [paymentmode, setpaymentmode] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const [AddCrm, setAddCrm] = useState(false);
  const [isBillSaved, setisBillSaved] = useState(false);
  const billkot: any = useRef();
  const bill: any = useRef();
  const pathname = usePathname();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fetchAllCategorys = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/dish/category/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("Category", data);
        setfetchCategorys(data.output);
      } else {
        console.log("Failed to fetch category");
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const fetchAllDishes = async () => {
    const section_id = sessionStorage.getItem('section_id');
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/menu/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'section_id': section_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("Dishes", data);
        setfetchDishes(data.output);
      } else {
        console.log("Failed to fetch Dishes");
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const getColorByType = (type: any) => {
    const non_veg = 'border-red-500';
    const veg = 'border-green-500';
    const eggetarian = 'border-yellow-500';

    const types = type.toLowerCase();

    if (types === 'non-veg') {
      return non_veg;
    } else if (types === 'veg') {
      return veg;
    } else {
      return eggetarian;
    }
  }

  const getColorByTypeText = (type: any) => {
    const non_veg = 'text-red-500';
    const veg = 'text-green-500';
    const eggetarian = 'text-yellow-500';

    const types = type.toLowerCase();

    if (types === 'non-veg') {
      return non_veg;
    } else if (types === 'veg') {
      return veg;
    } else {
      return eggetarian;
    }
  }

  const handleSearch = (e: any) => {
    setShowAll(false);
    setSearch(e.target.value);
  }

  const handleKotPrint = useReactToPrint({
    content: () => billkot.current,
  });

  const handleBillPrint = useReactToPrint({
    content: () => bill.current,
  });

  const handleAddToCart = (dish: any) => {
    const existingDish = Cart.find(item => item.id === dish.id);
    if (existingDish) {
      setCart(Cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...Cart, { ...dish, quantity: 1 }]);
    }
    setShowCart(true);
  }

  const handleAddCrm = () => {
    setAddCrm(!AddCrm);
  }

  const handleIncrement = (id: any) => {
    setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  const handleDecrement = (id: any) => {
    setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
  }

  const handleDelete = (id: any) => {
    setCart(Cart.filter(item => item.id !== id));
  }

  const calculateTotalAmount = () => {
    return Cart.reduce((total, item) => total + (item.Price * item.quantity), 0);
  };

  const handleViewBill = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/bills/management/fetch/single`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'bill_id': sessionStorage.getItem('bill_id'),
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        console.log("Bill Fetched");
        console.log("Billss",data);
        const billinfo = data.output[0].BillInfo;
        setBill(billinfo);
        console.log("Bill", Bill);
        setViewBill(true);
      } else {
        console.log("Failed to fetch");
        setisBillSaved(true);
      }

    } catch (e: any) {
      setisBillSaved(true);
      throw console.error(e);
    }
  }

  const menutotal = calculateTotalAmount();
  sessionStorage.setItem('menu_total', menutotal);
  let cgstRate;
  let sgstRate;

  if (menutotal < 7500) {
    cgstRate = "2.5%";
    sgstRate = "2.5%";
  } else {
    cgstRate = "9%";
    sgstRate = "9%";
  }
  const cgstRateNum = parseFloat(cgstRate.replace('%', ''));
  const sgstRateNum = parseFloat(sgstRate.replace('%', ''));
  const cgstAmt = (cgstRateNum / 100) * menutotal;
  const sgstAmt = (sgstRateNum / 100) * menutotal;
  const grosstotal = menutotal + cgstAmt + sgstAmt;
  const disRate = parseFloat(discountAmt.replace('%', ''));
  const discount = (disRate / 100) * grosstotal;
  const totalAmt = grosstotal - discount;

  const handleSettleBill = async () => {

    console.log("Is Active")
    try {

      const response = await fetch(`${ApiHost}/api/hotel/bills/management/update/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'bill_id': sessionStorage.getItem('bill_id'),
          'table_id': sessionStorage.getItem('table_id'),
          'total_amount': totalAmt,
          'cgst_rate': cgstRate,
          'sgst_rate': sgstRate,
          'cgst_amount': cgstAmt,
          'sgst_amount': sgstAmt,
          'menu_total': menutotal,
          'balance_amount': balance,
          'discount_rate': discountAmt,
          'discount_amount': discount,
          'payment_mode': paymentmode,
          'payment_status': paymentstatus,
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setSettleBill(true);
        setBillpaid(true);
        setTimeout(() => {
          setBillpaid(false);
        }, 2000);
      } else {
        console.log("Failed to fetch");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleOrder = async (e: any) => {
    e.preventDefault();

    try {

      const orderData = Cart.map((item: any) => ({
        quantity: item.quantity.toString(),
        menu_id: item.id
      }));

      const response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'type': sessionStorage.getItem('type'),
          'table_id': sessionStorage.getItem('table_id'),
          'waiter_id': sessionStorage.getItem('waiter_id'),
          'hotel_id': sessionStorage.getItem('hotel_id'),
          'menu_data': orderData,
        }),
      });
      const data = await response.json();
      if (data.returncode === 200) {
        console.log('Order Added', data);
        const id = JSON.stringify(data.output.id);
        sessionStorage.setItem('bill_id', JSON.parse(id));
        // setShowCart(false);
        setOrderadd(true);
        setMessage(data.message);
        setTimeout(() => {
          setOrderadd(false);
        }, 2500);
      } else {
        console.log('Failed to add order');
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleCart = ()=>{
    setShowCart(!ShowCart);
  }

  useEffect(() => {
    fetchAllCategorys();
    fetchAllDishes();

    if (pathname.startsWith('/hotels/menu')) {
      sessionStorage.setItem('type', 'Dine-In');
    } else {
      console.log(pathname);
    }

  }, [pathname]);


  console.log("Cart here", Cart)

  console.log("menu total", menutotal)
  console.log("gross total", grosstotal)
  console.log("total amount", totalAmt)
  console.log("discount amount", discountAmt)
  console.log("Payment mode", paymentmode)
  console.log("Payment status", paymentstatus)
  console.log("Bill", Bill);


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
          <div className="ml-[70px] h-screen flex">
            <div className="p-4 w-full">
              <div className="flex justify-between items-center px-2">
                <h1 className="text-red-500 font-bold text-3xl text-center">Restaurant</h1>
                <div className="w-full inline-flex justify-end items-center p-2">
                  <input
                    type="text"
                    className="rounded-lg"
                    placeholder="Search by name or by code"
                    value={Search}
                    onChange={handleSearch}
                  />
                </div>
                <div onClick={handleCart}>
                  <FaArrowLeft size={25} />
                </div>
              </div>
              <div className="p-2 ">
                <div className="flex items-center gap-6 p-2">
                  <div
                    onClick={() => { setShowAll(!ShowAll); setisClicked(null) }}
                    className={`text-red-500 cursor-pointer`}
                  >
                    All
                  </div>
                  {
                    fetchCategorys.map((category: any, index) => (
                      <div
                        key={index}
                        onClick={() => { setisClicked(category.id); setShowAll(false) }}
                        className={`${isClicked === category.id ? 'text-red-500' : ''} cursor-pointer`}
                      >
                        {category.CategoryName}
                      </div>
                    ))
                  }
                </div>
                <hr className="border border-zinc-400" />
                <div className="p-4">
                  <div className='flex justify-between items-center p-2'>
                    <h3 className="my-4 text-xl">Choose Dishes</h3>
                    <Link href="/hotels/takeaway" className='p-2 border border-red-500 rounded-lg'>Take away</Link>
                  </div>
                  <div className="">
                    {
                      ShowAll
                        ?
                        <div className="flex flex-wrap items-center gap-8">
                          {
                            fetchDishes.map((dish: any) => (
                              <div
                                key={dish.id}
                                onClick={() => handleAddToCart(dish)}
                                className={`w-[200px] p-2 py-4 text-xl border flex flex-col justify-center items-center gap-4 rounded-lg ${getColorByType(dish.Dish.Type)}`}
                              >
                                <div>{dish.Dish.DishName}</div>
                                <div className={`${getColorByTypeText(dish.Dish.Type)}`}>{dish.Dish.Type}</div>
                              </div>
                            ))
                          }
                        </div>
                        :
                        <div className="flex flex-wrap gap-8">
                          {
                            fetchDishes.filter((dishes: any) => dishes.CategoryId === isClicked
                              || dishes.Dish.DishName.toLowerCase().includes(Search.toLowerCase())
                              || dishes.Code.toLowerCase().includes(Search.toLowerCase()))
                              .map((dish: any) => (
                                <div
                                  key={dish.id}
                                  onClick={() => { sessionStorage.setItem('menu_id', dish.id); handleAddToCart(dish); }}
                                  className={`w-[200px] p-2 py-4 text-xl border flex flex-col justify-center items-center gap-4 rounded-lg ${getColorByType(dish.Dish.Type)}`}
                                >
                                  <div>{dish.Dish.DishName}</div>
                                  <div className={`text-center ${getColorByTypeText(dish.Dish.Type)}`}>{dish.Dish.Type}</div>
                                </div>
                              ))
                          }
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              ShowCart
                ?
                <div className="w-1/2 h-full bg-black text-white">
                  <div>
                    <FaArrowLeft size={25} color='#fff' className="m-3 cursor-pointer" onClick={() => setShowCart(false)} />
                  </div>
                  <div className="flex items-center h-[90%] p-2">
                    <div className='p-4 w-full h-full flex flex-col justify-between border-r border-zinc-400'>
                      <div className="">
                        <div className='flex items-center gap-8'>
                          <span className='flex-1'>Item</span>
                          <span className='w-1/4 text-center'>QTY</span>
                          <span>Price</span>
                          <span>Action</span>
                        </div>
                        <div className='w-full'>
                          {
                            Cart.map((item: any) => (
                              <div key={item.id} className='w-full flex flex-col items-center gap-2'>
                                <div className="w-full flex items-center justify-between gap-8 my-1 text-base">
                                  <span className='flex-1'>{item.Dish.DishName}</span>
                                  <div className='w-1/4 h-[40px] inline-flex justify-between items-center gap-1'>
                                    <button onClick={() => handleDecrement(item.id)} className='inline-flex justify-center items-center'>
                                      <FaMinus size={20} />
                                    </button>
                                    <span className='p-1 px-2 bg-red-400 rounded-lg inline-flex justify-center items-center text-xl'>
                                      {item.quantity}
                                    </span>
                                    <button onClick={() => handleIncrement(item.id)} className='inline-flex justify-center items-center'>
                                      <FaPlus size={20} />
                                    </button>
                                  </div>
                                  <span className="mx-2">₹{item.Price * item.quantity}</span>
                                  <button onClick={() => handleDelete(item.id)} className='inline-flex justify-center items-center'>
                                    <FaTrash size={20} />
                                  </button>
                                </div>
                                {/*<input type="text" className="w-full p-1 text-black rounded-lg" />*/}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className='w-full flex flex-col gap-4'>
                        <div className='w-full flex justify-center items-center flex-wrap gap-4'>
                          <button onClick={handleOrder} className='m-2 bg-red-500 text-white p-2 rounded-lg'>Save</button>
                          <button onClick={() => { handleViewBill(); }} className='m-2 bg-red-500 text-white p-2 rounded-lg'>View bill</button>
                          <button onClick={() => {
                            setSettleBill(true);
                          }} className='m-2 bg-red-500 text-white p-2 rounded-lg'>Settle bill</button>
                          <button onClick={handleKotPrint} className="bg-red-500 text-white p-2 rounded-lg">Kot print</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                null
            }
            {
              ViewBill
              &&
              (
                <div className='w-full h-dvh fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-25'>
                  <div className='bg-white w-1/3 h-[600px] relative rounded-xl p-2'>

                    <button
                      onClick={
                        () => {
                          setViewBill(false);
                        }
                      }
                      className="absolute top-2 right-2 text-2xl bg-black text-gray-900 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
                    >
                      <FaXmark size={20} />
                    </button>
                    {
                      Bill?.map((items: any, index) => {

                        return (
                          <div key={index} className='w-full h-full flex flex-col justify-center items-center'>
                            <div key={index} className='w-full h-full bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-center items-center'>
                              <p className='text-center'><span className='text-red-500 font-bold'>Invoice No.</span> {items.id}</p>
                              <div className='w-full flex flex-col justify-center items-center p-4'>
                                <div className='w-full inline-flex justify-between items-center my-2'>
                                  <p className='w-full'>Name</p>
                                  <p className='w-[80px]'>Qty</p>
                                  <p className='w-[80px]'>Price</p>
                                </div>
                                <hr className='border-white border w-full' />
                                {
                                  Cart.map((item: any, index) => (
                                    <div key={index} className='w-full inline-flex justify-between items-center my-2'>
                                      <p className='w-full'>{item.Dish.DishName}</p>
                                      <p className='w-[80px]'>{item.quantity}</p>
                                      <p className='w-[80px]'>{item.Price * item.quantity}</p>
                                    </div>
                                  ))
                                }
                                <hr className='border-white border w-full' />
                                <div className='w-full inline-flex justify-between items-center my-2'>
                                  <p>Total Amount:</p>
                                  <p className='w-[80px]'> </p>
                                  <p className='w-[80px]'>{calculateTotalAmount()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
            {
              SettleBill
              &&
              (
                <div className='w-full h-dvh fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-25'>
                  <div className='bg-white w-1/3 h-auto relative rounded-xl p-2'>

                    <button
                      onClick={
                        () => {
                          setSettleBill(false);
                        }
                      }
                      className="absolute top-2 right-2 text-2xl bg-black text-gray-900 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
                    >
                      <FaXmark size={20} />
                    </button>
                    <div className='w-full h-full flex flex-col justify-between items-center'>
                      <div className='w-full h-full bg-slate-900 text-white rounded-xl p-6'>
                        <div className='w-full flex flex-col gap-4 justify-center items-center p-4'>
                          <div>
                            <p><span className='font-bold text-xl'>Menu total :- </span>{menutotal}</p>
                          </div>
                          <div>
                            <p><span className='font-bold text-xl'>Cgst amount :- </span>{cgstAmt}</p>
                          </div>
                          <div>
                            <p><span className='font-bold text-xl'>Sgst amount :- </span>{sgstAmt}</p>
                          </div>
                          <div className="w-full">
                            <label htmlFor="balance">Balance amount</label>
                            <input className='w-full text-black' type="number" value={balance} onChange={(e) => { setbalance(Number(e.target.value)) }} placeholder='Enter balance ' />
                          </div>
                          <div className="w-full">
                            <label htmlFor="discount">Discount %</label>
                            <input className='w-full text-black' type="number" value={discountAmt} onChange={(e) => { setdiscountAmt(e.target.value) }} placeholder='Enter Discount Rate @ (10%)' />
                          </div>
                          <div className="w-full">
                            <label htmlFor="mode">Payment mode</label>
                            <select
                              name="paymentmode"
                              className="w-full text-black"
                              value={paymentmode}
                              onChange={(e) => { setpaymentmode(e.target.value) }}
                            >
                              <option value="">--Select--</option>
                              <option value="Credit card">Credit card</option>
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label htmlFor="status">Payment status</label>
                            <select
                              name="paymentstatus"
                              className="w-full text-black"
                              value={paymentstatus}
                              onChange={(e) => { setpaymentstatus(e.target.value) }}
                            >
                              <option value="">--Select--</option>
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                              <option value="Partpaid">Part paid</option>
                            </select>
                          </div>

                          <div>
                            <p><span className='font-bold text-xl'>Total Amount :- </span>{totalAmt}</p>
                          </div>

                          <div className='w-full inline-flex justify-between items-center'>
                            <button onClick={() => { handleSettleBill(); }} type='submit' className='p-2 bg-red-500 text-white rounded-lg'>submit</button>

                            <button onClick={handleBillPrint} className='p-2 bg-red-500 text-white rounded-lg'>Print bill</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
      }
      {
        Orderadd
          ?
          <div className={`w-[300px] h-[80px] fixed inline-flex justify-center items-center top-5 right-10 border-t-[8px] border-green-500 bg-green-200 rounded-lg`}>
            <div className="text-green-500 text-xl font-bold">{message}</div>
          </div>
          :
          []
      }
      {
        Billpaid
          ?
          <div className={`w-[300px] h-[80px] fixed inline-flex justify-center items-center top-5 right-10 border-t-[8px] border-green-500 bg-green-200 rounded-lg`}>
            <div className="text-green-500 text-xl font-bold">Bill Paid</div>
          </div>
          :
          []
      }
      {
        isBillSaved
          ?
          <div className={`w-[300px] h-[80px] fixed inline-flex justify-center items-center top-5 right-10 border-t-[8px] border-red-500 bg-red-200 rounded-lg`}>
            <div className="text-red-500 text-xl font-bold">{message}</div>
          </div>
          :
          []
      }
      <div ref={billkot} className="max-w-md mx-auto p-4 border border-zinc-300 rounded-md bg-white text-black fixed left-0 z-50">
        <div className="flex justify-between mb-2">
          <span>Dt: {formattedDate}</span>
        </div>
        <div className="mb-2">
          <span><strong>{sessionStorage.getItem('table_name')}</strong></span>
        </div>
        <table className="w-full text-left border-collapse mb-2">
          <thead>
            <tr className="border-b">
              <th className="py-1">Item</th>
              <th className="py-1 text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            {
              Cart.map((items: any, index) => {
                return (
                  <tr key={index} className="border-b">
                    <td className="py-1">{items.Dish.DishName}</td>
                    <td className="py-1 text-right">{items.quantity}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div className="text-center m-6">
          <span>!!! Thank You !!!</span>
        </div>

      </div>

      <div ref={bill} className="max-w-md mx-auto p-4 border border-zinc-300 rounded-md bg-white text-black fixed left-0 z-50">
        <div className="flex justify-between mb-2">
          <span>Dt: {formattedDate}</span>
        </div>
        <div className="mb-2">
          <span><strong>{sessionStorage.getItem('table_name')}</strong></span>
        </div>
        <table className="w-full text-left border-collapse mb-2">
          <thead>
            <tr className="border-b">
              <th className="py-1">Item</th>
              <th className="py-1 text-center">Qty</th>
              <th className="py-1 text-right">Rate</th>
            </tr>
          </thead>
          <tbody>
            {
              Cart.map((items: any, index) => {
                return (
                  <tr key={index} className="border-b">
                    <td className="py-1">{items.Dish.DishName}</td>
                    <td className="py-1 text-center">{items.quantity}</td>
                    <td className="py-1 text-right">{items.Price}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div className="w-full p-1 inline-flex justify-between items-center">
          <div>
            Cgst
          </div>
          <div>{cgstAmt}</div>
        </div>
        <div className="w-full p-1 inline-flex justify-between items-center">
          <div>
            Sgst
          </div>
          <div>{sgstAmt}</div>
        </div>
        <div className="w-full p-1 inline-flex justify-between items-center">
          <div>
            Discount %
          </div>
          <div>{discount}</div>
        </div>
        <div className="w-full p-1 inline-flex justify-between items-center">
          <div>
            Total Amount
          </div>
          <div>{totalAmt}</div>
        </div>

        <div className="text-center m-6">
          <span>!!! Thank You !!!</span>
        </div>

      </div>
    </>
  )
}

