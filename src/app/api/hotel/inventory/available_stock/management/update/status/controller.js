import { update_available_stock_status } from "@/db/crud/inventory/available_stock/update";

export async function update_available_stock(data) {
	try {

		const available_stock_id = data['available_stock_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( available_stock_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_available_stock_status({
			available_stock_id,
			status
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
