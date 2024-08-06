import { update_supplier_status } from "@/db/crud/inventory/suppliers/update";

export async function update_supplier(data) {
	try {

		const supplier_id = data['supplier_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( supplier_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_supplier_status({
			supplier_id,
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
