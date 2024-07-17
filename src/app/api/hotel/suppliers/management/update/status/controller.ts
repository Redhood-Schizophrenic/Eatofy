import { ApiResponse } from "@/types/ApiResponse";
import { update_supplier_status } from "@/db/crud/inventory/suppliers/update";

export async function update_supplier(data: any): Promise<ApiResponse> {
	try {

		const supplier_id: string | null = data['supplier_id'];
		const status: string | null = data['status'];

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

		return {
			returncode: 200,
			message: "Status Updated",
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
