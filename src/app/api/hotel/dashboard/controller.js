import { read_hotel_bills_asc } from "@/db/crud/bills/management/read";
import { groupBy } from "@/utils/groupBy";

function values_mapper(orders, key) {
	const groupByOrders = groupBy(orders, key);
	const totalAmt = [];
	const counts = [];
	const dates = [];

	for (const [date, data] of Object.entries(groupByOrders)) {
		totalAmt.push(data.TotalAmount);
		counts.push(data.count);
		dates.push(date);
	}

	return {
		Amount: totalAmt,
		Orders: counts,
		Dates: dates
	}
}

export async function hotel_dashboard(data) {
	try {

		const hotel_id = data['hotel_id'];
		const from = data['from'];
		const to = data['to'];

		// Default Invalid Checker
		if (hotel_id == null || hotel_id == undefined || hotel_id == "" ||
			from == null || from == undefined || from == "" ||
			to == null || to == undefined || to == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

		// Convert input dates to local time Date objects
		const from_date = new Date(`${from}T00:00:00`);
		const to_date = new Date(`${to}T23:59:59`);

		// Hotel's Order Fetch
		const orders_response = await read_hotel_bills_asc({ hotel_id });
		const orders_res = orders_response.output;

		// Filter orders within the date range
		let orders = orders_res.filter((order) => {
			order.Date = order.createdAt.toISOString().split('T')[0];
			return order.createdAt >= from_date && order.createdAt <= to_date;
		});

		// Total Orders
		const all_orders_data = values_mapper(orders, "Date");
		let amount = 0, count = 0;
		all_orders_data.Orders.map((order) => { count += order });
		all_orders_data.Amount.map((order) => { amount += order });
		const all_orders = count;
		const orders_amount = amount;

		// Dine In Orders
		const dine_in_orders = orders.filter(order => order.Type === 'Dine-In');
		const dine_in_data = values_mapper(dine_in_orders, "Date");
		amount = 0, count = 0;
		dine_in_data.Orders.map((order) => { count += order });
		dine_in_data.Amount.map((order) => { amount += order });
		const dine_orders = count;
		const dine_amount = amount;


		// Takeaway Orders
		const takeaway__orders = orders.filter(order => order.Type === 'Takeaway');
		const takeaway_data = values_mapper(takeaway__orders, "Date");
		amount = 0, count = 0;
		takeaway_data.Orders.map((order) => { count += order });
		takeaway_data.Amount.map((order) => { amount += order });
		const takeaway_orders = count;
		const takeaway_amount = amount;

		// Delivery Orders
		const delivery__orders = orders.filter(order => order.Type === 'Delivery');
		const delivery_data = values_mapper(delivery__orders, "Date");
		amount = 0, count = 0;
		delivery_data.Orders.map((order) => { count += order });
		delivery_data.Amount.map((order) => { amount += order });
		const delivery_orders = count;
		const delivery_amount = amount;

		// Employee 
		const employee_data = values_mapper(orders, "Waiter.FirstName");
		return {
			returncode: 200,
			message: "Dashboard Fetched",
			output: {
				Orders: {
					All_Order: all_orders,
					Dine_In: dine_orders,
					Takeaway: takeaway_orders,
					Delivery: delivery_orders
				},
				Chart: {
					All_Order: all_orders_data,
					Dine_In: dine_in_data,
					Takeaway: takeaway_data,
					Delivery: delivery_data,
					Employee: employee_data
				},
				Amount: {
					All_Order: orders_amount,
					Dine_In: dine_amount,
					Takeaway: takeaway_amount,
					Delivery: delivery_amount
				},
				Table: {
					All: orders,
					Dine_In: dine_in_orders,
					Takeaway: takeaway__orders,
					Delivery: delivery__orders
				}
			}
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
