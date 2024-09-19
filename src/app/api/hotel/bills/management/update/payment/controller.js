import { bill_payment } from "@/db/crud/bills/management/update";
import { update_table_status } from "@/db/crud/tables/management/update";

export async function pay_bill(data) {
	try {

		const bill_id = data['bill_id'];
		const table_id = data['table_id'];
		const total_amount = data['total_amount'];
		const cgst_rate = data['cgst_rate'];
		const cgst_amount = data['cgst_amount'];
		const sgst_rate = data['sgst_rate'];
		const sgst_amount = data['sgst_amount'];
		const vat_rate = data['vat_rate'];
		const vat_amount = data['vat_amount'];
		const menu_total = data['menu_total'];
		const balance_amount = data['balance_amount'];
		const discount_rate = data['discount_rate'];
		const discount_amount = data['discount_amount'];
		const delivery_rate = data['delivery_rate'];
		const delivery_amount = data['delivery_amount'];
		const payment_mode = data['payment_mode'];
		const payment_status = data['payment_status'];

		// Paying the Bill
		const result = await bill_payment({
			bill_id,
			total_amount,
			cgst_rate,
			sgst_rate,
			cgst_amount,
			sgst_amount,
			menu_total,
			balance_amount,
			discount_rate,
			discount_amount,
			payment_mode,
			payment_status,
			vat_rate,
			vat_amount,
			delivery_rate,
			delivery_amount
		});

		// Update Table Status as Booked
		if (table_id != null) {
			await update_table_status({
				table_id,
				status: "Active"
			});
		}

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Bill Payment Updated",
				output: result.output
			};
		}
		else {
			return result;
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
