import { ApiResponse } from "@/types/ApiResponse";
import { check_supplier } from "@/db/crud/inventory/suppliers/read";
import { create_supplier } from "@/db/crud/inventory/suppliers/create";

export async function add_supplier(data: any): Promise<ApiResponse> {
	try {

		const supplier_name: string | null = data['supplier_name'];
		const contact: string | null = data['contact'];
		const email: string | null = data['email'];
		const gstin: string | null = data['gstin'];
		const address: string | null = data['address'];
		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if ( supplier_name == null || contact == null || email == null || gstin == null || hotel_id == null ) {
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
			hotel_id
		});

		return {
			returncode: 200,
			message: "Supplier Added",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
