import { read_bill_info } from "@/db/crud/bills/management/read";
import { order_display } from "@/db/crud/orders/management/read";

function extractNumberFromString(str) {
	const match = str.match(/[-+]?\d*\.?\d+/);
	return match ? parseFloat(match[0]) : null;
}

export async function fetch_bill_info(data) {
	try {
		const bill_id = data['bill_id'];

		if (!bill_id) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			};
		}

		const result = await read_bill_info({ bill_id });

		const billInfo = result.output.map((Bill) => {
			const date = new Date(Bill.createdAt);
			const formattedDate = date.toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
			}).replace(/ /g, ' ');

			const gst = Bill.CGSTAmount + Bill.SGSTAmount;
			const cgst_rate = extractNumberFromString(Bill.CGSTRate);
			const sgst_rate = extractNumberFromString(Bill.SGSTRate);
			const gst_rate = cgst_rate + sgst_rate;

			return {
				...Bill,
				Date: formattedDate,
				GST: gst,
				GSTRate: `${gst_rate}%`
			};
		});

		const orders_result = await order_display({ bill_id });

		return {
			returncode: 200,
			message: "Bill Info Fetched",
			output: [{
				BillInfo: billInfo,
				Orders: orders_result.output
			}]
		};

	} catch (error) {
		console.error('Error fetching bill info:', error);
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
