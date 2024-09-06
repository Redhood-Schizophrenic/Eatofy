import { check_supplier } from "@/db/crud/inventory/suppliers/read";
import { create_supplier } from "@/db/crud/inventory/suppliers/create";

export async function add_supplier(data) {
	try {

		const supplier_name = data['supplier_name'] || null;
		const contact = data['contact'] || null;
		const email = data['email'] || null;
		const gstin = data['gstin'] || null;
		const address = data['address'] || null;
		const supplier_type = data['supplier_type'] || null;
		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if ( supplier_name == null || contact == null || email == null || gstin == null || hotel_id == null || supplier_type == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Suppliers
		const existingSupplier = await check_supplier({ supplier_name, contact, hotel_id });
		if ( existingSupplier.returncode == 200 ) {
			return {
				returncode: 400,
				message: "Supplier Exists",
				output: existingSupplier.output
			};
		}

		// Inserting the Supplier
		const result = await create_supplier({
			supplier_name,
			contact,
			email,
			gstin,
			address,
			hotel_id,
			supplier_type
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
