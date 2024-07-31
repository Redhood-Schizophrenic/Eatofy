'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useRef, useState } from "react";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";

export default function Menu() {
	const [isLoading, setLoading] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [Search, setSearch] = useState('');
	const [isDishDisplayFullWidth, setDishDisplayFullWidth] = useState(false);
	const [showBillInvoice, setShowBillInvoice] = useState(true);
	const [ClickedCategory, setClickedCategory] = useState("");
	const [ShowAllDishes, setShowAllDishes] = useState(true);
	const [HotelId, setHotelId] = useState('');
	const [TableId, setTableId] = useState('');
	const [WaiterId, setWaiterId] = useState('');
	const [isSettleBill, setisSettleBill] = useState(false);
	const [showBillButton, setshowBillButton] = useState(false);
	const [showBillUpdate, setshowBillUpdate] = useState(false);
	const [disAmt, setdisAmt] = useState('');
	const [vatAmt, setvatAmt] = useState('');
	const [billP, setbillP] = useState(false);
	const [kotP, setkotP] = useState(false);
	const [BalanceAmt, setBalanceAmt] = useState(0);
	const [PaymentMode, setPaymentMode] = useState('');
	const [PaymentStatus, setPaymentStatus] = useState('');
	const Type = 'Takeaway';
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
	const [CustomerDate, setCustomerDate] = useState('');
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
		setshowBillUpdate(false);
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

	const handleSaveMenu = async () => {
		try {

			const OrderData = Cart.map(item => ({
				quantity: `${item.quantity}`,
				menu_id: item.id,
				hotel_id: item.Section.HotelId
			}));

			const response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
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

			if (response.status === 200) {
				const data = await response.json();
				console.log("Order Saved", data);
				setBillId(data.output[0].Bill.id);
			} else {
				console.log("Lavde Lagle BCC000000D");
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
			} else {
				console.log("Lavde Lagle BCC000000D");
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

		// if (OldCart.length != 0) {
		oldcartTotal = (OldCart.reduce((total, item) => total + (item.Menu.Price * parseInt(item.Quantity)), 0));
		console.log(oldcartTotal);
		// } else {
		// 	oldcartTotal = 0;
		// }
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
					'balance_amount': BalanceAmt,
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
			} else {
				console.log("Failed to update bill");
				setMessage('Payment Failed');
			}

		} catch (e) {
			throw console.error(e);
		}
	}

	useEffect(() => {

		setHotelId(sessionStorage.getItem('hotel_id'));
		setTableId(sessionStorage.getItem('table_id'));
		setWaiterId(sessionStorage.getItem('waiter_id'));

		const fetch_bill = async () => {
			const section_id = sessionStorage.getItem('section_id');
			const table_id = sessionStorage.getItem('table_id');

			try {

				setLoading(true);
				const response = await fetch(`${ApiHost}/api/hotel/bill_order`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ 'section_id': section_id, 'table_id': table_id }),
				});

				const data = await response.json();
				if (data.returncode === 200) {
					const response_data = await data.output[0];
					setExistingBill(response_data.ExistingBill);
					setMenus(response_data.Menus);
					setCategories(response_data.Categories);
					if (response_data.ExistingBill.length != 0) {
						// setBillId(response_data.ExistingBill[0].id);
						setdoesBillExists(true);
						setExistingBill(response_data.ExistingBill);
						setOldCart(response_data.Orders);
					}
				} else {
					console.log("Failed to fetch Dishes");
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}

		fetch_bill()
	}, []);

	console.log("New Cart", Cart);
	console.log("Old Cart", OldCart);
	//
	console.log('Balance', BalanceAmt);
	console.log("Gross", grosstotal)
	console.log("total", totalAmt)
	console.log("paymentmode", PaymentMode);
	console.log("paymentstatus", PaymentStatus);

	return (
		<>
			{/* HotelSide Navbar */}
			<HotelSideNav />

			{/* Loading Screen */}
			{
				isLoading
					?
					<div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
						<svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
							<line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
							<line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
						</svg>
						<span className="text-4xl font-medium text-gray-500">Loading...</span>
					</div>
					:
					<div className="ml-[70px] flex px-0 overflow-hidden bg-white">
						<div id="Dish_Display" className={`h-auto transition-width duration-500 ${isDishDisplayFullWidth ? 'w-[65%]' : 'w-full'}`}>
							<div className="w-full inline-flex justify-between items-center p-4">
								<div>
									<h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-2xl uppercase font-bold">Takeaway Order</h1>
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
										className={`text-4xl text-black ${isDishDisplayFullWidth ? 'hidden' : 'block'}`}
									>
										<CiSquareChevLeft />
									</button>
								</div>
							</div>
							<div id="Categories" className="p-4 flex justify-between w-full">
								{
									<div className="flex flex-wrap gap-4">
										<button className="text-red-500 font-semibold">
											All
										</button>

										{
											Categories.map((category, index) => (
												<button
													key={index}
													onClick={
														() => {
															handleCategoryClick(category.CategoryName)
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

							<div className="w-full flex flex-col gap-4">
								<div className="flex justify-between p-2 px-4 items-center">
									<div>
										<p className="text-xl font-bold">Choose Dishes</p>
									</div>
								</div>

								<div className="flex gap-8 p-8 flex-wrap">
									{
										ShowAllDishes
											?
											Menus.map((menu, index) => (
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
												const categoryMatch = ClickedCategory === null || menu.Dish.Category.CategoryName === ClickedCategory;
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

						<div className={`bg-black text-white h-screen transition-transform duration-500 ${isMenuOpen ? 'w-[35%]' : 'fixed top-0 right-[-100%]'}`}>
							<div className="flex flex-col gap-4 justify-center align-center h-auto">

								<div className="flex">
									<div className="w-1/3 flex justify-start">
										<button
											onClick={toggleMenu}
											className="text-4xl ">
											<CiSquareChevRight />
										</button>
									</div>

									<div className="w-1/3 inline-flex justify-center items-center gap-4 font-bold text-xl p-4">
										{showBillInvoice ? (
											<div className="flex flex-col gap-2">
												<label>Bill <span className="text-xs font-normal">#{billId.slice(0, 12)}</span></label>
											</div>
										) : (
											<label>CRM</label>
										)}

									</div>

									<div className="w-1/3 flex items-center justify-end">
										{
											billId.length === 0 ?
												<button
													id="crm_display"
													className="h-10 p-1 px-2 w-[100px] bg-red-900 border border-white rounded"
													onClick={toggleDisplay}
												>
													{showBillInvoice ? (
														<label>Add Crm</label>
													) : (
														<label>Back</label>
													)}
												</button> :
												[]
										}
									</div>
								</div>

								{showBillInvoice ? (
									<div id="Bill_Invoice" className="h-auto flex flex-col flex-1">
										<div className="pt-4 h-[80dvh]">
											<table className="w-auto table-fixed text-left">
												<thead className="">
													<tr>
														<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-12 py-4">
															<p className="block antialiased font-sans font-bold text-sm text-blue-gray-900 leading-none opacity-70">
																Item
															</p>
														</th>
														<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-12 py-4">
															<p className="block antialiased font-sans font-bold text-sm text-blue-gray-900 leading-none opacity-70">
																Qty.
															</p>
														</th>
														<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-12 py-4">
															<p className="block antialiased font-sans font-bold text-sm text-blue-gray-900 leading-none opacity-70">
																Price
															</p>
														</th>
														<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-12 py-4">
															<p className="block antialiased font-sans text-sm text-blue-gray-900 font-bold leading-none opacity-70">
																Action
															</p>
														</th>
													</tr>
												</thead>
												<tbody>
													{
														Cart.map((items) => (
															<tr key={items.id}>
																<td className="p-4 border-b border-blue-gray-50">
																	<div className="flex flex-col gap-2 justify-center items-center">
																		<span> {items.Dish.DishName} </span>
																		<span className="text-xs font-normal"> Rs.{items.Price} </span>
																	</div>
																</td>
																<td className="p-4 border-b border-blue-gray-50">
																	<div className="flex justify-center items-center antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal gap-4">
																		<div className="flex flex-col">
																			<button onClick={async () => handleIncrement(items.id)} className="inline-flex justify-center items-center">
																				<FaPlus size={15} />
																			</button>
																			<button onClick={() => handleDecrement(items.id)} className="inline-flex justify-center items-center font-normal">
																				<FaMinus size={15} />
																			</button>
																		</div>
																		<span className="border border-white bg-red-500 px-3 py-1 rounded-xl font-bold text-xl"> {items.quantity} </span>
																	</div>
																</td>
																<td className="p-4 border-b border-blue-gray-50">
																	<p className="flex justify-center items-center antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
																		Rs.{items.Price * items.quantity}
																	</p>
																</td>
																<td className="p-4 border-b border-blue-gray-50">
																	<div className="flex justify-center items-center antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
																		<button onClick={() => handleCartItemDelete(items.id)} className="inline-flex justify-center items-center">
																			<FaTrash size={20} />
																		</button>
																	</div>
																</td>
															</tr>
														))
													}

												</tbody>
											</table>
										</div>
										<div className={`p-4 py-6 w-full ${showBillUpdate ? 'inline-flex justify-center items-center gap-4' : ''}`}>
											{
												Cart.length !== 0 ? (
													<div className="w-full inline-flex justify-center items-center gap-4">
														<button
															className="w-full bg-red-500 text-white p-2 px-3 rounded-md"
															onClick={() => { handleSaveMenu(); setshowBillButton(true) }}
														>Save</button>
														{
															showBillButton ?
																<button onClick={() => { setisSettleBill(true); setbillP(true); }} className="w-full inline-flex justify-center items-center bg-red-500 p-2 rounded-md">
																	Settle Bill
																</button> : []
														}
													</div>
												) : (
													<div className="w-full inline-flex justify-center items-center gap-4">
														<button
															className="w-full bg-red-500 text-white p-2 px-3 rounded-md"
															onClick={() => { handleSaveMenu(); setshowBillButton(true) }}
														>Save</button>
													</div>
												)
											}
										</div>
									</div>
								)
									// Bill Section
									: (

										<div id="CRM_Form" className="h-auto">

											<div className="bg-gray-500 h-[0.2dvh] w-full"></div>
											<div className="h-full p-2 flex flex-col gap-4 justify-center items-center">
												<div className="w-full flex flex-col gap-3">
													<label
														htmlFor="CustomerName"
														className="text-lg"
													>
														Customer Name <span className="text-red-500">*</span>
													</label>
													<input
														className='w-full bg-zinc-900 text-white'
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
														className='w-full bg-zinc-900 text-white'
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
														Email <span className="text-red-500">*</span>
													</label>
													<input
														className='w-full bg-zinc-900 text-white'
														type="text"
														value={CustomerEmail}
														onChange={
															(e) => {
																setCustomerEmail(e.target.value)
															}}
														placeholder='Enter Customer Email'
														required
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
														className='w-full bg-zinc-900 text-white'
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
														className='w-full bg-zinc-900 text-white'
														type="date"
														value={CustomerDate}
														onChange={
															(e) => {
																setCustomerDate(e.target.value)
															}}
													/>
												</div>
											</div>
										</div>
									)
									// CRM Section
								}
							</div>
						</div>
						{
							isSettleBill
								? (
									<div className="absolute w-[calc(100%-70px)] h-full bg-black bg-opacity-40 flex justify-center items-center">
										<div className="w-1/2 h-auto bg-white p-4 relative">
											<p className="w-full text-left text-red-500 font-bold p-2">Settle Bill</p>
											<p className={`border-2 p-2 text-center ${Message === 'Payment Successful' ? 'bg-green-200 border-green-500 text-green-500' : ''} ${Message === 'Payment Failed' ? 'bg-red-200 border-red-500 text-red-500' : ''}`}>{Message}</p>
											<div className="absolute top-4 right-4 bg-black inline-flex justify-center items-center rounded-full w-[30px] h-[30px]" onClick={() => { setisSettleBill(false); setbillP(false); }}>
												<div className="text-white">X</div>
											</div>
											<div className="w-full p-2">
												<div className="w-full bg-gray-400 text-white text-xl text-center p-1">
													Bill No
												</div>
												<div className="w-full text-center p-1">
													{billId.slice(0, 12)}
												</div>
												<div>
													<table className="table-auto w-full">
														<thead className="text-center">
															<tr className="bg-gray-400 text-white p-1">
																<th>Dishes</th>
																<th>QTY</th>
																<th className="text-right">Price</th>
															</tr>
														</thead>
														<tbody className="text-center">
															{
																Cart.map((item, index) => (
																	<tr key={index} className="border-t border-b border-black p-1">
																		<td>{item.Dish.DishName}</td>
																		<td>{item.quantity}</td>
																		<td className="text-right">{item.Price}</td>
																	</tr>
																))
															}
															<tr className="border-t border-b border-black">
																<td></td>
																<td></td>
																<td>Sub Total Amount :- {CalculateSubTotal()}</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											<div className="w-full p-2">
												<div className="w-full inline-flex justify-between items-center">
													<label className="text-lg w-1/2">Cgst</label>
													<div className="w-1/2 text-right">{cgstAmt}</div>
												</div>
												<div className="w-full inline-flex justify-between items-center">
													<label className="text-lg w-1/2">Sgst</label>
													<div className="w-1/2 text-right">{sgstAmt}</div>
												</div>
												<div className="w-full inline-flex justify-between items-center">
													<label className="text-lg w-1/2">Total Gst</label>
													<div className="w-1/2 text-right">{cgstAmt + sgstAmt}</div>
												</div>
												<div className="w-full inline-flex justify-between items-center mb-2">
													<label className="text-lg w-1/2">Enter Vat in %</label>
													<input type="text" value={vatAmt} onChange={(e) => { setvatAmt(e.target.value) }} className="w-1/2 p-1 text-base" placeholder="Vat in %" />
												</div>
												<div className="w-full inline-flex justify-between items-center">
													<label className="text-lg w-1/2">Enter Discount</label>
													<input type="text" value={disAmt} onChange={(e) => { setdisAmt(e.target.value) }} className="w-1/2 p-1 text-base" placeholder="Discount in %" />
												</div>
												<div className="w-full inline-flex justify-between items-center mb-2">
													<label className="text-lg w-1/2">Enter Balance Amount</label>
													<input type="number" value={BalanceAmt} onChange={(e) => { setBalanceAmt(Number(e.target.value)) }} className="w-1/2 p-1 text-base" placeholder="Balance amount" />
												</div>
												<div className="w-full my-4 border-b border-black">
													<div className="text-right my-2 text-lg font-bold">Total Amount :- Rs.{totalAmt ? (totalAmt) : (CalculateSubTotal())}</div>
												</div>
												<div className="text-red-500 font-bold mt-2">
													Payment mode
												</div>
												<div className="flex justify-start items-center gap-4 my-3">
													<div className={`p-3 rounded-md ${PaymentMode === 'Credit-card' ? 'bg-red-500 text-white' : 'bg-slate-200 hover:bg-red-500 hover:text-white'}`} onClick={() => { handlePaymentModeClick('Credit-card') }}>Credit-card</div>
													<div className={`p-3 rounded-md ${PaymentMode === 'Cash' ? 'bg-red-500 text-white' : 'bg-slate-200 hover:bg-red-500 hover:text-white'}`} onClick={() => { handlePaymentModeClick('Cash') }}>Cash</div>
													<div className={`p-3 rounded-md ${PaymentMode === 'UPI' ? 'bg-red-500 text-white' : 'bg-slate-200 hover:bg-red-500 hover:text-white'}`} onClick={() => { handlePaymentModeClick('UPI') }}>UPI</div>
												</div>
												<div className="text-red-500 font-bold">
													Payment status
												</div>
												<div className="flex justify-start items-center gap-4 my-3">
													<div className={`p-3 rounded-md ${PaymentStatus === 'Paid' ? 'bg-red-500 text-white' : 'bg-slate-200 hover:bg-red-500 hover:text-white'}`} onClick={() => { handlePaymentStatusClick('Paid') }}>Paid</div>
													<div className={`p-3 rounded-md ${PaymentStatus === 'Part-paid' ? 'bg-red-500 text-white' : 'bg-slate-200 hover:bg-red-500 hover:text-white'}`} onClick={() => { handlePaymentStatusClick('Part-paid') }}>Part-paid</div>
													<div className={`p-3 rounded-md ${PaymentStatus === 'Unpaid' ? 'bg-red-500 text-white' : 'bg-slate-200 hover:bg-red-500 hover:text-white'}`} onClick={() => { handlePaymentStatusClick('Unpaid') }}>Unpaid</div>
												</div>
												<div className="inline-flex items-center gap-4">
													<button className="bg-red-500 text-white p-2 rounded-md" onClick={() => { handleSettleBill() }}>
														Payment
													</button>
													<button onClick={() => { handleBillPrint(); setisSettleBill(false) }} className="bg-black text-white p-2 rounded-md">
														Print Bill
													</button>
												</div>
											</div>
										</div>
									</div>
								) : []
						}

							<div ref={bill} className={`max-w-md mx-auto p-4 border border-zinc-300 rounded-md bg-white text-black fixed ${billP ? 'top-0 left-0' : 'top-0 left-[-100%]'} z-[-100]`}>
								<div className="flex flex-col justify-between mb-2">
									<span>Bill No: {billId.slice(0, 12)}</span>
									<span>Date: {formattedDate}</span>
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
											Cart.map((items, index) => {
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
						</div>
			}
		</>
	)
}

