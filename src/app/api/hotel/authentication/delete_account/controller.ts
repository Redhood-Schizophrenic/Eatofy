import { ApiResponse } from "@/types/ApiResponse";
import { update_staff_status } from "@/db/crud/staff/management/update";

export async function delete_staff_account(data: any): Promise<ApiResponse> {
	try {

		const staff_id: string | null = data['staff_id'];

		// Default Invalid Checker
		if ( staff_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_staff_status({
			staff_id,
			status: "Inactive"
		});

		return {
			returncode: 200,
			message: "Account Deleted",
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
