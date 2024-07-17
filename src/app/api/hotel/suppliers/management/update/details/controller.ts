import { ApiResponse } from "@/types/ApiResponse";
import { update_supplier_details } from "@/db/crud/inventory/suppliers/update";

export async function update_supplier(data: any): Promise<ApiResponse> {
	try {

		const supplier_name: string | null = data['supplier_name'];
		const contact: string | null = data['contact'];
		const email: string | null = data['email'];
		const gstin: string | null = data['gstin'];
		const address: string | null = data['gstin'];
		const supplier_id: string | null = data['supplier_id'];

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

		return {
			returncode: 200,
			message: "Supplier's Details Updated",
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
