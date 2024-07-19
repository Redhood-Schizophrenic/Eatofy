'use client';
import HotelSideNav from "@/components/SideNavHotel";
import { useState } from "react";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

export default function Menu() {
	const [isLoading, setLoading] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [billId, setBillId] = useState("Order_zuihsujbhduj");
	const [showAll, setShowAll] = useState(true);
	const [search, setSearch] = useState('');
	const [isDishDisplayFullWidth, setDishDisplayFullWidth] = useState(false);
	const [showBillInvoice, setShowBillInvoice] = useState(true);

	// Customer Relationship Management
	const [CustomerName, setCustomerName] = useState('');
	const [CustomerContact, setCustomerContact] = useState('');
	const [CustomerEmail, setCustomerEmail] = useState('');
	const [CustomerOccassion, setCustomerOccassion] = useState('');
	const [CustomerDate, setCustomerDate] = useState('');

	// Supporting functions
	const handleSearch = (element) => {
		setShowAll(false);
		setSearch(element.target.value);
	}

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
		setDishDisplayFullWidth(!isDishDisplayFullWidth);
	}

	const toggleDisplay = () => {
		setShowBillInvoice(!showBillInvoice);
	}

	const items = {
		id: "jbnsjdfbfd",
		Price: 90,
		quantity: 10,
		Dish: {
			DishName: "Paneer Crispy"
		}
	}
	return (
		<main className="h-auto overflow-hidden">

			<HotelSideNav />
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
					<div className="ml-[70px] w-full flex overflow-hidden">
						<div id="Dish_Display" className={`h-screen transition-width duration-500 ${isDishDisplayFullWidth ? 'w-[60%]' : 'w-full'}`}>
							<div className="w-[93%] inline-flex justify-between items-center p-4">
								<div>
									<h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-2xl uppercase font-bold">Order</h1>
								</div>
								<div className="flex gap-4">
									<input
										type="text"
										className="rounded-lg text-sm bg-black text-white"
										placeholder="Search by name or code"
										value={search}
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
							<div className="bg-red-400 w-full h-[0.2dvh]"></div>
						</div>

						<div className={`w-[40%] bg-black text-white h-screen fixed top-0 right-0 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
							<div className="flex flex-col gap-4 justify-center align-center p-4">

								<div className="flex">
									<div className="w-1/3 flex justify-start">
										<button
											onClick={toggleMenu}
											className="text-4xl ">
											<CiSquareChevRight />
										</button>
									</div>

									<div className="w-1/3 text-center font-bold text-xl">
										{showBillInvoice ? (
											<label>#{billId}</label>
										) : (
											<label>CRM</label>
										)}

									</div>

									<div className="w-1/3 flex justify-end">
										<button
											id="crm_display"
											className="p-2 bg-red-900 border border-white rounded"
											onClick={toggleDisplay}
										>
											{showBillInvoice ? (
												<label>Add Crm</label>
											) : (
												<label>Back</label>
											)}
										</button>
									</div>

								</div>

								{showBillInvoice ? (
									<div id="Bill_Invoice" className="h-auto z-[-20]">


										<div className="pt-4">

											<table className="w-auto table-auto text-left">
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
													<tr key={items.id}>
														<td className="p-4 border-b border-blue-gray-50">
															<p className="flex  antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
																<div className="flex flex-col gap-2">
																	<span>{items.Dish.DishName}</span>
																	<span className="text-xs font-normal"> Rs.{items.Price} </span>
																</div>
															</p>
														</td>
														<td className="p-4 border-b border-blue-gray-50">
															<p className="flex justify-center items-center antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal gap-4">
																<button onClick={() => handleIncrement(items.id)} className="inline-flex justify-center items-center">
																	<FaPlus size={15} />
																</button>
																<span className="border border-white bg-red-500 px-3 py-1 rounded-xl font-bold text-xl">{items.quantity}</span>
																<button onClick={() => handleDecrement(items.id)} className="inline-flex justify-center items-center font-normal">
																	<FaMinus size={15} />
																</button>

															</p>
														</td>
														<td className="p-4 border-b border-blue-gray-50">
															<p className="flex justify-center items-center antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
																Rs.{items.Price * items.quantity}
															</p>
														</td>
														<td className="p-4 border-b border-blue-gray-50">
															<p className="flex justify-center items-center antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
																<button onClick={() => handleDelete(items.id)} className="inline-flex justify-center items-center">
																	<FaTrash size={20} />
																</button>
															</p>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								) : (
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

											<div className="w-[40%] flex flex-col mt-4">
												<button
													className="p-2 bg-red-900 border border-white"
												>
													Add Customer
												</button>
											</div>
										</div>
									</div>
								)}

							</div>
						</div>
					</div>
			}
		</main>
	)
}

