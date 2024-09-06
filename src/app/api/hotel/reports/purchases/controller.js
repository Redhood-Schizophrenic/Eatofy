import { values_mapper } from "./utils";
import { read_invoices_asc } from "@/db/crud/inventory/purchases/invoices/read";

export async function fetch_purchases_reports(data) {
	try {

		const hotel_id = data['hotel_id'];
		const from = data['from'];
		const to = data['to'];

		// Default Invalid Checker
		if ( hotel_id == null || hotel_id == undefined || hotel_id == "" ||
			from == null || from == undefined || from == "" ||
			to == null || to == undefined || to == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}
		const from_date = new Date(from);
		const to_date = new Date(to);

		// Getting the Invoices
		const invoices_result = await read_invoices_asc({
			hotel_id
		});
		
		// Chart
		const purchase_res = invoices_result.output;
		let purchases = purchase_res.filter((purchase) => {
			purchase.Datetime = new Date(purchase.Date);
			return from_date <= purchase.Datetime && purchase.Datetime <= to_date;
		});

		// Total Amount
		const date_wise = values_mapper(purchases, "Date");
		let amount = 0;
		date_wise.Amount.map((purchase) => { amount += purchase });

		return {
			returncode: 200,
			message: "Hotel's Invoices Fetched",
			output: {
				Invoices: purchases,
				DateWise: date_wise,
				TotalAmount: amount
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
