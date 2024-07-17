import { ApiResponse } from "@/types/ApiResponse";
import { read_bill_info } from "@/db/crud/bills/management/read";
import { order_display } from "@/db/crud/orders/management/read";

export async function fetch_bill_info(data: any): Promise<ApiResponse> {
	try {

		const bill_id: string | null = data['bill_id'];

		// Default Invalid Checker
		if (bill_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Items
		const result = await read_bill_info({
			bill_id
		});

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

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
