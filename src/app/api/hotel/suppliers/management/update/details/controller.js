import { update_supplier_details } from "@/db/crud/inventory/suppliers/update";

export async function update_supplier(data) {
	try {

		const supplier_name = data['supplier_name'] || null;
		const contact = data['contact'] || null;
		const email = data['email'] || null;
		const gstin = data['gstin'] || null;
		const address = data['gstin'] || null;
		const supplier_id = data['supplier_id'] || null;

		// Default Invalid Checker
		if ( supplier_name == null || contact == null || email == null || gstin == null || supplier_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the details
		const result = await update_supplier_details({
			supplier_name,
			contact,
			email,
			gstin,
			address,
			supplier_id
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
