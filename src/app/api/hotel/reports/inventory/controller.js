import { stock_values_mapper, values_mapper } from "./utils";
import { read_available_stock_report } from "@/db/crud/inventory/stock_report/read";

export const datetime_formatter = (date) => {
	// Get the day, month, and year
	const day = date.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Combine the day, month, and year with the ordinal suffix
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}

export async function fetch_inventory_reports(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const from = data['from'] || null;
		const to = data['to'] || null;

		// Default Invalid Checker
		if (hotel_id == null || from == null || to == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}
		const from_date = new Date(from);
		const to_date = new Date(to);

		const inventory_data = await Inventory_Data(hotel_id, from_date, to_date);

		return {
			returncode: 200,
			message: "Inventory Report",
			output: inventory_data
		};

	} catch (error) {
		console.error(error)
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

const Inventory_Data = async (hotel_id, from_date, to_date) => {
	const data = await read_available_stock_report({ hotel_id });
	const inventory_data = data.output.filter((stock) => {
		stock.Datetime = new Date(stock.Date);
		stock.Date = datetime_formatter(stock.Datetime);
		return from_date <= stock.Datetime && to_date >= stock.Datetime;
	});

	const metrics = stock_values_mapper(inventory_data);
	const date_wise = values_mapper(inventory_data, "Items.ItemName");

	return {
		Data: inventory_data,
		Metrics: metrics,
		Chart: date_wise
	}
}
