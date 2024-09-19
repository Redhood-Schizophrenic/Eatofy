'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useRef, useState } from "react";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { FaCreditCard, FaMinus, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCashRegister, FaGooglePay } from "react-icons/fa";


export default function Menu() {
	const [isLoading, setLoading] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [Search, setSearch] = useState('');
	const [isDishDisplayFullWidth, setDishDisplayFullWidth] = useState(false);
	const [showBillInvoice, setShowBillInvoice] = useState(true);
	const [ClickedCategory, setClickedCategory] = useState(null);
	const [ShowAllDishes, setShowAllDishes] = useState(true);
	const [HotelId, setHotelId] = useState('');
	const [TableId, setTableId] = useState('fc09332c-76d5-497a-8185-2da23ac48ec2');
	const [WaiterId, setWaiterId] = useState('');
	const [isSettleBill, setisSettleBill] = useState(false);
	const [ShowError, setShowError] = useState(false);
	const [disAmt, setdisAmt] = useState('');
	const [vatAmt, setvatAmt] = useState('');
	const [BalanceAmt, setBalanceAmt] = useState(0);
	const [PaymentMode, setPaymentMode] = useState('Cash');
	const [PaymentStatus, setPaymentStatus] = useState('Paid');
	const [IsOrderSaved, setIsOrderSaved] = useState(false);
	const [IsOrderFailed, setIsOrderFailed] = useState(false);
	const [TableName, setTableName] = useState('');
	const route = useRouter();
	const [Type, setType] = useState('');
	const billkot = useRef();
	const bill = useRef();
	const today = new Date();
	const formattedDate = today.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Bill Management
	const [doesBillExists, setdoesBillExists] = useState(false);
	const [billId, setBillId] = useState("");
	const [OldCart, setOldCart] = useState([]);
	const [Cart, setCart] = useState([]);
	const [Message, setMessage] = useState('');


	// Customer Relationship Management
	const [CustomerName, setCustomerName] = useState('');
	const [CustomerContact, setCustomerContact] = useState('');
	const [CustomerEmail, setCustomerEmail] = useState('');
	const [CustomerOccassion, setCustomerOccassion] = useState('');
	const [CustomerDate, setCustomerDate] = useState('' || Date.now());
	// const [CustomerId, setCustomerId] = useState('');


	// Fetch Display Data
	const [ExistingBill, setExistingBill] = useState([]);
	const [Menus, setMenus] = useState([]);
	const [Categories, setCategories] = useState([]);

	// Search Dishes
	const handleSearch = (element) => {
		setShowAllDishes(false);
		setSearch(element.target.value);
	}

	// On Category click display related dishes
	const handleCategoryClick = (category_id) => {
		setShowAllDishes(false);
		setClickedCategory(category_id);
	}

	// Display Cart
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
		setDishDisplayFullWidth(!isDishDisplayFullWidth);
	}

	const handleKotPrint = useReactToPrint({
		content: () => billkot.current,
	});

	const handleBillPrint = useReactToPrint({
		content: () => bill.current,
	});

	const handleAddToCart = (dish) => {
		const existingDish = Cart.find(item => item.id === dish.id);
		if (existingDish) {
			setCart(Cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
		} else {
			setCart([...Cart, { ...dish, quantity: 1 }]);
		}
		setMenuOpen(true);
		setDishDisplayFullWidth(true);
	}

	const handleIncrement = async (id) => {
		console.log("Id");
		setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
		setshowBillUpdate(false);
	}

	const handleDecrement = (id) => {
		console.log(id);
		setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
	}

	const handleCartItemDelete = (id) => {
		setCart(Cart.filter(item => item.id !== id));
		// setshowBillUpdate(false);
	}

	const toggleDisplay = () => {
		setShowBillInvoice(!showBillInvoice);
	}

	const handlePaymentModeClick = (mode) => {
		setPaymentMode(mode);
	};

	const handlePaymentStatusClick = (status) => {
		setPaymentStatus(status);
	};

	const fetch_bill = async () => {
		const section_id = sessionStorage.getItem('section_id');

		try {

			setLoading(true);
			const response = await fetch(`${ApiHost}/api/hotel/takeaway_bill`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 'section_id': section_id }),
			});

			const data = await response.json();
			if (data.returncode === 200) {
				const response_data = await data.output[0];
				console.log("Next",response_data);
				setMenus(response_data.Menus);
				setCategories(response_data.Categories);
				return
			} else {
				console.log("Failed to fetch Dishes");
				return
			}
		} catch (e) {
			console.error(e);
			return
		} finally {
			setLoading(false);
		}
	}


	const handleSaveMenu = async () => {
		try {

			const OrderData = Cart.map(item => ({
				quantity: `${item.quantity}`,
				menu_id: item.id,
				hotel_id: item.Section.HotelId
			}));

			let response;
			if (Type == "Dine-In") {

				response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'type': Type,
						'hotel_id': HotelId,
						'waiter_id': WaiterId,
						'menu_data': OrderData,
						'customer_name': CustomerName,
						'contact': CustomerContact,
						'email': CustomerEmail,
						'occassion': CustomerOccassion,
						'date': CustomerDate
					}),
				});
			}
			else {
				response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'type': Type,
						'table_id': TableId,
						'hotel_id': HotelId,
						'waiter_id': WaiterId,
						'menu_data': OrderData,
						'customer_name': CustomerName,
						'contact': CustomerContact,
						'email': CustomerEmail,
						'occassion': CustomerOccassion,
						'date': CustomerDate
					}),
				});
			}

			if (response.status === 200) {
				const data = await response.json();
				console.log("Order Saved", data);
				setBillId(data.output[0].Bill.id);
				setIsOrderSaved(true);
				setTimeout(() => {
					setIsOrderSaved(false);
				}, 2000);
			} else {
				console.log("Failed to Save menu");
				setIsOrderFailed(true);
				fetch_bill();
				setTimeout(() => {
					setIsOrderFailed(false);
				}, 2000);
			}

		} catch (e) {
			throw console.error(e);
		}
	}

	const handleUpdateMenu = async () => {
		try {

			const OrderData = Cart.map(item => ({
				bill_id: OldCart[0].BillId,
				quantity: `${item.quantity}`,
				menu_id: item.id,
				hotel_id: item.Section.HotelId
			}));

			const response = await fetch(`${ApiHost}/api/hotel/orders/menus/add/multiple`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'data': OrderData
				}),
			});

			if (response.status === 200) {
				const data = await response.json();
				console.log("Order Saved", data);
				setIsOrderSaved(true);
				// fetch_bill();
				setTimeout(() => {
					setIsOrderSaved(false);
				}, 2000);
			} else {
				console.log("Failed to Update menu");
				setIsOrderFailed(true);
				setTimeout(() => {
					setIsOrderFailed(false);
				}, 2000);
			}

		} catch (e) {
			throw console.error(e);
		}
	}

	const CalculateSubTotal = () => {
		let oldcartTotal;
		let newCart;

		const parseItemValue = (value) => {
			const parsedValue = parseInt(value);
			return isNaN(parsedValue) ? 0 : parsedValue;
		};

		oldcartTotal = (OldCart.reduce((total, item) => total + (item.Menu.Price * parseInt(item.Quantity)), 0));
		newCart = (Cart.reduce((total, item) => total + (parseItemValue(item.Price) * parseItemValue(item.quantity)), 0));
		console.log("Cart", newCart);
		const amount = oldcartTotal + newCart;
		return amount.toString();
	}

	const menutotal = CalculateSubTotal();
	let cgstRate;
	let sgstRate;

	if (CalculateSubTotal() < 7500) {
		cgstRate = "2.5%";
		sgstRate = "2.5%";
	} else {
		cgstRate = "9%";
		sgstRate = "9%";
	}
	const cgstRateNum = parseFloat(cgstRate.replace('%', ''));
	const sgstRateNum = parseFloat(sgstRate.replace('%', ''));
	const cgstAmt = (cgstRateNum / 100) * parseFloat(menutotal);
	const sgstAmt = (sgstRateNum / 100) * parseFloat(menutotal);
	const VatAmt = vatAmt === '' ? 0 : (parseFloat(vatAmt.replace('%', '')) / 100) * parseFloat(menutotal);
	console.log(menutotal)
	const grosstotal = parseFloat(menutotal) + cgstAmt + sgstAmt + VatAmt;
	console.log("Gross", grosstotal, "Cgst", cgstAmt, "sgst", sgstAmt)
	const discount = disAmt === '' ? 0 : (parseFloat(disAmt.replace('%', '')) / 100) * grosstotal;
	const totalAmt = discount === 0 ? grosstotal : grosstotal - discount;
	console.log("Total", totalAmt)
	// const TotalAmt = CalculateTotal();

	const handleSettleBill = async () => {

		try {

			const response = await fetch(`${ApiHost}/api/hotel/bills/management/update/payment`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'bill_id': billId,
					'table_id': TableId,
					'total_amount': totalAmt,
					'cgst_rate': cgstRate,
					'cgst_amount': cgstAmt,
					'sgst_rate': sgstRate,
					'sgst_amount': sgstAmt,
					'vat_rate': vatAmt,
					'vat_amount': VatAmt,
					'menu_total': parseFloat(menutotal),
					'balance_amount': parseFloat(BalanceAmt),
					'discount_rate': disAmt,
					'discount_amount': discount,
					'payment_mode': PaymentMode,
					'payment_status': PaymentStatus
				}),
			});

			if (response.status === 200) {
				const data = await response.json();
				console.log("data", data);
				setMessage('Payment Successful');
				setTimeout(() => {
					route.push('/hotels/home');
				}, 2000);
			} else {
				console.log("Failed to update bill");
				setMessage('Payment Failed');
			}

		} catch (e) {
			throw console.error(e);
		}
	}

	useEffect(() => {
		setType(sessionStorage.getItem('type'));
		setHotelId(sessionStorage.getItem('hotel_id'));
		setTableId(sessionStorage.getItem('table_id'));
		setWaiterId(sessionStorage.getItem('waiter_id'));

		if (HotelId) {
			fetch_bill()
		}
	}, [HotelId,Type]);


	return (
		<>
			{/* HotelSide Navbar */}
			<HotelSideNav />

			{/* Loading Screen */}
			{
				<div className="ml-[70px] flex px-0 overflow-hidden bg-white">
					<div id="Dish_Display" className={`h-auto transition-width duration-500 ${isDishDisplayFullWidth || OldCart.length !== 0 ? 'w-[60dvw]' : 'w-full'}`}>
						<div className="w-full inline-flex justify-between items-center p-4">
							<div className="flex gap-4 justify-center items-center">
								<Link
									href="/hotels/home"
								>
									<IoIosArrowBack
										className="text-red-500"
										size={45}
									/>
								</Link>
								<h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Takeaway</h1>
							</div>
							<div className="flex gap-3">
								<input
									type="text"
									className="rounded-lg text-sm bg-black text-white p-2 focus:outline-none focus:ring-red-400"
									placeholder="Search by name or code"
									value={Search}
									onChange={handleSearch}
								/>
								<button
									onClick={toggleMenu}
									className={`text-4xl text-black ${isDishDisplayFullWidth || OldCart.length !== 0 ? 'hidden' : 'block'}`}
								>
									<CiSquareChevLeft />
								</button>
							</div>
						</div>
						<div id="Categories" className="p-4 flex justify-between w-full border-b border-black">
							{
								<div className="flex flex-wrap gap-4">
									<button onClick={() => { setShowAllDishes(true) }} className="text-red-500 font-semibold">
										All
									</button>

									{
										Categories.map((category, index) => (
											<button
												key={index}
												onClick={
													() => {
														handleCategoryClick(category.id)
													}
												}
												className="text-black font-semibold cursor-pointer"
											>
												{category.CategoryName}
											</button>
										))
									}
								</div>
							}
						</div>

						<div className="w-full flex flex-col gap-4 h-screen">
							<div className="flex justify-between p-2 px-4 items-center">
								<div>
									<p className="text-xl font-bold">Choose Dishes</p>
								</div>
							</div>

							<div className="flex gap-6 px-6 flex-wrap">
								{
									ShowAllDishes
										?
										Menus.filter((menu) => {
											const searchMatch = menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase());
											return searchMatch;
										}).map((menu, index) => (
											<div
												key={index}
												onClick={() => { handleAddToCart(menu) }}
												id="menu"
												className={`border-2 p-6 w-[35dvh] h-[20dvh] text-center rounded-lg flex flex-col justify-center items-center ${menu.Dish.Type === 'Veg' ? 'border-green-500 text-green-700' :
													menu.Dish.Type === 'Non-Veg' ? 'border-red-500 text-red-700' :
														menu.Dish.Type === 'Beverage' ? 'border-blue-500 text-blue-700' :
															menu.Dish.Type === 'Egg' ? 'border-yellow-500 text-yellow-600' : 'border-black'
													}`}
											>
												<p className="flex flex-wrap text-lg font-semibold">
													{menu.Dish.DishName}
												</p>
												<p className="flex justify-center items-center">
													&#35;{menu.Dish.Code}
												</p>
												<p className="flex justify-center items-center">
													{menu.Dish.Category.CategoryName}
												</p>

											</div>
										))
										:
										Menus.filter((menu) => {
											// Check if the category matches or if no category is selected (show all)
											const categoryMatch = ClickedCategory === null || menu.Dish.Category.id === ClickedCategory;
											// Check if the dish name or code includes the search text
											const searchMatch = menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase());
											// Return true if both conditions are met
											return categoryMatch && searchMatch;

										}).map((menu, index) => (
											<div
												key={index}
												onClick={() => { handleAddToCart(menu) }}
												id="menu"
												className={`border-2 p-6 w-[35dvh] h-[20dvh] text-center rounded-lg flex flex-col justify-center items-center ${menu.Dish.Type === 'Veg' ? 'border-green-500 text-green-700' :
													menu.Dish.Type === 'Non-Veg' ? 'border-red-500 text-red-700' :
														menu.Dish.Type === 'Beverage' ? 'border-blue-500 text-blue-700' :
															menu.Dish.Type === 'Egg' ? 'border-yellow-500 text-yellow-600' : 'border-black'
													}`}
											>
												<p className="flex flex-wrap text-lg font-semibold">
													{menu.Dish.DishName}
												</p>
												<p className="flex justify-center items-center">
													&#35;{menu.Dish.Code}
												</p>
												<p className="flex justify-center items-center">
													{menu.Dish.Category.CategoryName}
												</p>
											</div>
										))

								}
							</div>

						</div>

					</div>

					<div className={`bg-black text-white h-auto transition-transform duration-500 max-h-dvh ${isMenuOpen || OldCart.length !== 0 ? 'fixed w-[35dvw] top-0 right-0' : 'fixed top-0 right-[-100%]'}`}>

						{
							IsOrderSaved ? (
								<div className="w-1/4 h-[60px] fixed top-10 right-10 bg-green-200 z-50 border-t-[4px] border-green-500 inline-grid place-items-center">
									<h1 className="text-green-400">Order Saved</h1>
								</div>
							) : IsOrderFailed ? (
								<div className="w-1/4 h-[60px] fixed top-10 right-10 bg-red-200 border-t-[4px] border-red-500 inline-grid place-items-center">
									<h1 className="text-red-400">Failed to save order</h1>
								</div>
							) : []
						}

						<div className="flex flex-col gap-4 justify-center align-center h-dvh overflow-y-scroll py-2">

							<div className="flex px-4">
								<div className=" flex justify-start">
									<button
										onClick={toggleMenu}
										className="text-4xl ">
										<CiSquareChevRight />
									</button>
								</div>

								<div className="flex-1 inline-flex justify-start items-center gap-4 font-bold text-xl p-4">
									{showBillInvoice ? (
										<div className="flex flex-col gap-2">
											<label> Takeaway </label>
										</div>
									) : isSettleBill ? (
										<div className="flex justify-between w-full">
											<label>Payment</label>
										</div>
									) : (
										<label>Customer Details</label>
									)}

								</div>

								<div className="w-1/3 flex items-center justify-end">
									{
										billId.length === 0 ?
											<button
												id="crm_display"
												className="h-10 p-1 px-2 w-auto bg-red-900 border border-white rounded"
												onClick={toggleDisplay}
											>
												{showBillInvoice ? (
													<label>Add Customer</label>
												) : (
													<label>Back</label>
												)}
											</button> :
											[]
									}
								</div>
							</div>

							{
								showBillInvoice ? (
									<div id="Dish Screen" className="h-full relative">
										<div className="flex flex-col">
											<div id="table" className="px-6">
												<div id="head" className="flex justify-between items-center p-2 px-3 border-y-2 border-zinc-500">
													<div className="flex-1">ITEMS</div>
													<div className="w-[30%] text-center">QTY</div>
													<div className="w-[20%] text-center uppercase">Price</div>
												</div>
												<div id="body" className="flex flex-col max-h-[80dvh] overflow-y-scroll overflow-x-hidden">
													{
														OldCart.map((items, index) => {
															return (
																<div key={index} className="flex p-2 grayscale">
																	<div className="flex-1 inline-flex justify-start items-center gap-3">
																		<div className="w-[30px] h-[30px] bg-red-400 inline-grid place-items-center rounded-md"><FaTrash size={20} className="text-white" /></div>
																		<div>{items.Menu.Dish.DishName}</div>
																	</div>
																	<div className="w-[30%] inline-flex justify-center items-center gap-4">
																		{/*<FaMinus size={20} onClick={() => handleDecrement(items.id)} />*/}
																		<div className="w-[30px] h-[30px] bg-red-400 font-bold text-white inline-grid place-items-center rounded-md">{items.Quantity}</div>
																		{/*<FaPlus size={20} onClick={() => handleIncrement(items.id)} />*/}
																	</div>
																	<div className="w-[20%] inline-flex flex-col justify-center items-center">
																		<div className="text-base">₹ {items.TotalAmount}</div>
																		<div className="text-xs">Per. {items.Menu.Price}</div>
																	</div>
																</div>
															)
														})
													}
													{
														Cart.map((items, index) => {
															return (
																<div key={index} className="flex p-2">
																	<div className="flex-1 inline-flex justify-start items-center gap-3">
																		<div onClick={() => handleCartItemDelete(items.id)} className="w-[30px] h-[30px] bg-red-400 inline-grid place-items-center rounded-md"><FaTrash size={20} className="text-black" /></div>
																		<div>{items.Dish.DishName}</div>
																	</div>
																	<div className="w-[30%] inline-flex justify-center items-center gap-4">
																		<FaMinus size={20} onClick={() => handleDecrement(items.id)} />
																		<div className="w-[30px] h-[30px] bg-red-400 font-bold text-black inline-grid place-items-center rounded-md">{items.quantity}</div>
																		<FaPlus size={20} onClick={() => handleIncrement(items.id)} />
																	</div>
																	<div className="w-[20%] inline-flex flex-col justify-center items-center">
																		<div className="text-base">₹ {items.Price * items.quantity}</div>
																		<div className="text-xs">Per. {items.Price}</div>
																	</div>
																</div>
															)
														})
													}
												</div>
											</div>
										</div>
									</div>
								)
									:
									isSettleBill ? (
										<div className="w-full h-auto max-h-[75dvh] overflow-y-scroll overflow-x-hidden bg-black px-4 mb-10 flex flex-col gap-4">
											<p className={`border-2 border-zinc-500 text-center ${Message === 'Payment Successful' ? 'bg-green-200 border-green-500 text-green-500 p-2' : ''} ${Message === 'Payment Failed' ? 'bg-red-200 border-red-500 text-red-500 p-2' : ''}`}>{Message}</p>
											<div className="font-bold mt-2 text-xl">
												Payment mode
											</div>
											<div className="flex justify-between items-center gap-2">
												<div className={`p-3 rounded-md w-full gap-2 inline-grid place-items-center ${PaymentMode === 'Credit-card' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentModeClick('Credit-card') }}>
													<FaCreditCard size={25} />
													<span className="text-sm">Credit-card</span>
												</div>
												<div className={`p-3 rounded-md w-full inline-grid gap-2 place-items-center ${PaymentMode === 'Cash' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentModeClick('Cash') }}>
													<FaCashRegister size={25} />
													<span className="text-sm">Cash</span>
												</div>
												<div className={`p-3 rounded-md w-full gap-2 inline-grid place-items-center ${PaymentMode === 'UPI' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentModeClick('UPI') }}>
													<FaGooglePay size={25} />
													<span className="text-sm">UPI</span>
												</div>
											</div>

											<div className="font-bold mt-2 text-xl">
												Payment Details
											</div>
											<div className="w-full p-2 flex flex-col gap-2 text-lg">
												<div className="w-full inline-flex justify-between items-center ">
													<label className="w-1/2">Cgst</label>
													<div className="w-1/2 text-right">{cgstAmt}</div>
												</div>
												<div className="w-full inline-flex justify-between items-center">
													<label className="w-1/2">Sgst</label>
													<div className="w-1/2 text-right">{sgstAmt}</div>
												</div>
												<div className="w-full inline-flex justify-between items-center">
													<label className="w-1/2">Total Gst</label>
													<div className="w-1/2 text-right">{cgstAmt + sgstAmt}</div>
												</div>
												<div className="w-full inline-flex justify-between items-center mb-2">
													<label className="w-1/2">Enter Vat in %</label>
													<input type="text" value={vatAmt} onChange={(e) => { setvatAmt(e.target.value) }} className="w-1/2 bg-[#252836] text-base text-white" placeholder="Vat in %" />
												</div>
												<div className="w-full inline-flex justify-between items-center mb-2">
													<label className="w-1/2">Enter Discount</label>
													<input type="text" value={disAmt} onChange={(e) => { setdisAmt(e.target.value) }} className="w-1/2 p-1 bg-[#252836] text-base text-white" placeholder="Discount in %" />
												</div>
												<div className="w-full inline-flex justify-end items-center mb-2 ">
													<label className="w-1/2">Enter Balance Amount</label>
													<input type="text" value={BalanceAmt} onChange={(e) => { setBalanceAmt(e.target.value) }} className="w-1/2 p-1 bg-[#252836] text-base text-white" placeholder="Balance amount" />
												</div>
												<div className="w-full inline-flex justify-between items-center border-t border-zinc-500">
													<h1 className="text-right my-2 text-xl ">Total:- </h1>
													<p className="font-semibold text-xl">
														Rs.{totalAmt ? (totalAmt) : (CalculateSubTotal())}
													</p>
												</div>

												<div className="text-white font-bold">
													Payment status
												</div>
												<div className="flex justify-start items-center gap-4 my-3 text-sm">
													<div className={`p-3 rounded-md ${PaymentStatus === 'Paid' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentStatusClick('Paid') }}>Paid</div>
													<div className={`p-3 rounded-md ${PaymentStatus === 'Part-paid' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentStatusClick('Part-paid') }}>Part-paid</div>
													<div className={`p-3 rounded-md ${PaymentStatus === 'Unpaid' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentStatusClick('Unpaid') }}>Unpaid</div>
												</div>
												<div className="w-full inline-flex justify-center items-center gap-4 font-semibold">
													<button className="w-full bg-red-500 text-white p-2 rounded-md" onClick={() => { handleSettleBill() }}>
														Payment
													</button>
													<button onClick={() => { handleBillPrint(); setisSettleBill(false) }} className="w-full bg-black text-red-500 p-2 rounded-md border border-red-500">
														Print Bill
													</button>
												</div>
											</div>
										</div>

									)
										:
										(
											<div id="CRM_Form" className="h-auto">
												<div className="bg-gray-500 h-[0.2dvh] w-full"></div>
												<div className="h-full p-6 flex flex-col gap-4 justify-center items-center">
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerName"
															className="text-lg"
														>
															Customer Name <span className="text-red-500">*</span>
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={CustomerName}
															onChange={
																(e) => {
																	setCustomerName(e.target.value)
																}}
															placeholder='Enter Customer Name'
															required
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerContact"
															className="text-lg"
														>
															Contact <span className="text-red-500">*</span>
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={CustomerContact}
															onChange={
																(e) => {
																	setCustomerContact(e.target.value)
																}}
															placeholder='Enter Contact'
															required
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerEmail"
															className="text-lg"
														>
															Email
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={CustomerEmail}
															onChange={
																(e) => {
																	setCustomerEmail(e.target.value)
																}}
															placeholder='Enter Customer Email'
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerOccassion"
															className="text-lg"
														>
															Occassion
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={CustomerOccassion}
															onChange={
																(e) => {
																	setCustomerOccassion(e.target.value)
																}}
															placeholder='Enter Occassion'
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerDate"
															className="text-lg"
														>
															Date
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="date"
															value={CustomerDate}
															onChange={
																(e) => {
																	setCustomerDate(e.target.value)
																}}
														/>
													</div>
												</div>
												<div className="w-full pb-20 inline-flex justify-between items-center gap-4 p-6">
													<button onClick={toggleDisplay} className="w-full bg-red-500 p-2 text-white rounded-md">Save</button>
													<button type="reset" className="w-full border border-red-500 p-2 text-white rounded-md">Cancel</button>
												</div>
											</div>
										)
							}

							<div className="fixed bottom-0 w-[35dvw] bg-black flex justify-between items-center gap-3 p-4">
								{
									OldCart.length === 0
										? (
											<div
												onClick={() => handleSaveMenu()}
												className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
											>Save</div>
										)
										:
										(
											<div
												onClick={() => handleUpdateMenu()}
												className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
											>Update</div>
										)
								}
								<div
									onClick={() => handleBillPrint()}
									className="w-full p-1.5 bg-red-500 font-semibold text-center rounded-md cursor-pointer"
								>Print</div>
								{
									isSettleBill ? (
										<div
											onClick={() => { setisSettleBill(false); toggleDisplay() }}
											className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
										>Back</div>
									) : (
										<div
											onClick={() => { setisSettleBill(true); toggleDisplay() }}
											className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
										>Pay</div>
									)
								}
								<div
									onClick={() => { handleKotPrint(); handleSaveMenu(); }}
									className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
								>Kot & Print</div>
							</div>
						</div>
					</div >


					<div ref={billkot} className="max-w-md mx-auto p-4 border border-zinc-300 rounded-md bg-white text-black fixed left-0 top-[50dvh] z-[-500]">
						<div className="mb-2">
							<span><strong>{TableName}</strong></span>
						</div>
						<table className="w-full text-left border-collapse mb-2 border-b border-dashed border-black">
							<thead>
								<tr className="border-b">
									<th className="py-1">Item</th>
									<th className="py-1 text-right">Qty</th>
								</tr>
							</thead>
							<tbody>
								{
									Cart.map((items, index) => {
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
						{/*

							<div className="text-center m-6">
								<span>!!! Thank You !!!</span>
							</div>
*/}
					</div>

					<div ref={bill} className="max-w-md mx-auto p-4 border border-zinc-300 rounded-md bg-white text-black fixed top-[50dvh] left-0 z-[-150]">
						<div className="flex flex-col justify-between mb-2">
							<span>Bill No: {billId.slice(0, 12)}</span>
							<span>Date: {formattedDate}</span>
						</div>
						<div className="mb-2">
							<span><strong>{TableName}</strong></span>
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
									OldCart.map((items, index) => {
										return (
											<tr key={index} className="border-b">
												<td className="py-1">{items.Menu.Dish.DishName}</td>
												<td className="py-1 text-center">{items.Quantity}</td>
												<td className="py-1 text-right">{items.Menu.Price}</td>
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
								Vat %
							</div>
							<div>{VatAmt}</div>
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
				</div >
			}
		</>
	)
}

