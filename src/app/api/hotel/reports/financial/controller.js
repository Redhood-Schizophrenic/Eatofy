import { payment_mode_values_mapper, sales_values_mapper, expenses_values_mapper } from "./utils";
import { read_hotel_bills_asc } from "@/db/crud/bills/management/read";
import { read_expenses_asc } from "@/db/crud/expenses/management/read";
import { read_invoices_asc } from "@/db/crud/inventory/purchases/invoices/read";

const datetime_formatter = (date) => {
	// Get the day, month, and year
	const day = date.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Combine the day, month, and year with the ordinal suffix
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}

export async function fetch_financial_reports(data) {
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

		const sales_data = await Sales_Data(hotel_id, from_date, to_date);
		const expenses_data = await Expenses_Data(hotel_id, from_date, to_date);
		const purchases_data = await Purchases_Data(hotel_id, from_date, to_date);

		return {
			returncode: 200,
			message: "Finance Report",
			output: {
				Sales: sales_data,
				Purchase: purchases_data,
				Expenses: expenses_data
			}
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

const Purchases_Data = async (hotel_id, from_date, to_date) => {
	const data = await read_invoices_asc({ hotel_id });
	const purchases_data = data.output.filter((hotel) => {
		hotel.Datetime = new Date(hotel.Date);
		hotel.Date = datetime_formatter(hotel.Datetime);
		return from_date <= hotel.Datetime && to_date >= hotel.Datetime;
	});

	const metrics = sales_values_mapper(purchases_data, "HotelId");
	const total_purchases_amt = metrics.Amount[0];
	const total_purchases = metrics.Count[0];

	const payment_mode_byforgation = payment_mode_values_mapper(purchases_data);

	const date_wise = sales_values_mapper(purchases_data, "Date");
	let amount = 0;
	date_wise.Amount.map((purchase) => { amount += purchase });


	return {
		Data: purchases_data,
		Amount: total_purchases_amt,
		Count: total_purchases,
		Payment_Mode: payment_mode_byforgation,
		Chart: date_wise
	}
}

const Expenses_Data = async (hotel_id, from_date, to_date) => {
	const data = await read_expenses_asc({ hotel_id });
	const expenses_data = data.output.filter((hotel) => {
		hotel.Datetime = new Date(hotel.Date);
		hotel.Date = datetime_formatter(hotel.Datetime);
		return from_date <= hotel.Datetime && to_date >= hotel.Datetime;
	});

	const metrics = expenses_values_mapper(expenses_data, "HotelId");
	const total_expenses_amt = metrics.Amount[0];
	const total_expenses = metrics.Count[0];

	const payment_mode_byforgation = payment_mode_values_mapper(expenses_data);

	const date_wise = expenses_values_mapper(expenses_data, "Date");
	let amount = 0;
	date_wise.Amount.map((expense) => { amount += expense });

	return {
		Data: expenses_data,
		Amount: total_expenses_amt,
		Count: total_expenses,
		Payment_Mode: payment_mode_byforgation,
		Chart: date_wise
	}
}

const Sales_Data = async (hotel_id, from_date, to_date) => {

	const data = await read_hotel_bills_asc({ hotel_id });
	const sales_data = data.output.filter((hotel) => {
		hotel.Datetime = new Date(hotel.createdAt);
		hotel.Date = datetime_formatter(hotel.Datetime);
		return from_date <= hotel.Datetime && to_date >= hotel.Datetime;
	});

	const metrics = sales_values_mapper(sales_data, "HotelId");
	const total_sales_amt = metrics.Amount[0];
	const total_sales = metrics.Count[0];

	const payment_mode_byforgation = payment_mode_values_mapper(sales_data);

	const date_wise = sales_values_mapper(sales_data, "Date");
	let amount = 0;
	date_wise.Amount.map((sales) => { amount += sales });


	return {
		Data: sales_data,
		Amount: total_sales_amt,
		Count: total_sales,
		Payment_Mode: payment_mode_byforgation,
		Chart: date_wise
	}
}
