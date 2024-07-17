import { bill_payment } from "@/db/crud/bills/management/update";
import { update_table_status } from "@/db/crud/tables/management/update";
import { ApiResponse } from "@/types/ApiResponse";

export async function pay_bill(data: any): Promise<ApiResponse> {
	try {

		const bill_id: string | null = data['bill_id'];
		const table_id: string | null = data['table_id'];
		const total_amount: number | null = data['total_amount'];
		const cgst_rate: string | null = data['cgst_rate'];
		const sgst_rate: string | null = data['sgst_rate'];
		const cgst_amount: number | null = data['cgst_amount'];
		const sgst_amount: number | null = data['sgst_amount'];
		const menu_total: number | null = data['menu_total'];
		const balance_amount: number | null = data['balance_amount'];
		const discount_rate: string | null = data['discount_rate'];
		const discount_amount: number | null = data['discount_amount'];
		const payment_mode: string | null = data['payment_mode'];
		const payment_status: string | null = data['payment_status'];

		// Default Invalid Checker
		if (bill_id == null || total_amount == null || cgst_rate == null || sgst_rate == null || cgst_amount == null || sgst_amount == null || menu_total == null || balance_amount == null || discount_rate == null || discount_amount == null || payment_mode == null || payment_status == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

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
			payment_status
		});

		// Update Table Status as Booked
		if (table_id != null) {
			await update_table_status({
				table_id,
				status: "Active"
			});
		}

		return {
			returncode: 200,
			message: "Bill Payment Updated",
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
