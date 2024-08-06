import { read_bill_info_by_table } from "@/db/crud/bills/management/read";
import { order_display } from "@/db/crud/orders/management/read";

export async function fetch_bill_info(data) {
	try {

		const table_id = data['table_id'];

		// Default Invalid Checker
		if (table_id == null || table_id == undefined || table_id == "") {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Items
		const result = await read_bill_info_by_table({
			table_id
		});

		if (result.returncode == 200 && result.output.length!=0 ) {

			const bill_id = result.output[0].id;

			const orders_result = await order_display({
				bill_id
			});


			return {
				returncode: 200,
				message: "Bill Info Fetched",
				output: [{
					BillInfo: result.output,
					Orders: orders_result.output
				}]
			};
		}
		else {
			return {
				returncode: 403,
				message: "Bill Doesn't Exists.",
				output: []
			};
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
