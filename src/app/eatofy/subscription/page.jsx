'use client'

import SideNav from "@/components/SideNavbar";
import { ApiHost } from "@/constants/url_consts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Subscription() {

	const [sub, setSubscription] = useState([]);
	const route = useRouter();

	const fetchSubscription = async () => {
		const res = await fetch(`${ApiHost}/api/eatofy/subscriptions/management/fetch`);
		const data = await res.json();
		setSubscription(data.output);
	}

	useEffect(() => {
		fetchSubscription();
	}, [])

	return (
		<>
			<SideNav />
			<section className="ml-[60px] h-dvh bg-gradient-to-tr from-red-500 to-zinc-800">
				<div className="w-full h-auto text-right py-4 px-4">
					<Link
						href={`${ApiHost}/eatofy/add/subscription`}
						className="p-2 bg-red-500 text-white font-bold rounded-md"
					>
						Add Subscription
					</Link>
				</div>
				<div className="p-6">
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
							{
								sub.map((items, i) => (
									<tr className="px-4 py-4 border border-black" key={items.id}>
										<td className="px-4 py-4">{++i}</td>
										<td className="px-4 py-4">{items.SubscriptionName}</td>
										<td className="px-4 py-4">{items.Price}</td>
										<td className="px-4 py-4">{items.Validity}</td>
										<td className="px-4 py-4">
											<button
												onClick={
													() => {
														sessionStorage.setItem("subscription_id", items.id);
														sessionStorage.setItem("subscription_validity", items.Validity);
														if (sessionStorage.getItem("subscription_id") === items.id && sessionStorage.getItem("subscription_validity")) {
															route.push('/eatofy/add/hotel_subscription');
														} else {
															alert("subscription is not selected!!")
														}
													}
												}
											>
												<FaArrowRightToBracket size={25} />
											</button>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</section >
		</>
	)
}
