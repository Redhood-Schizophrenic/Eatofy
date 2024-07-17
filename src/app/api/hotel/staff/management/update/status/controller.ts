import { ApiResponse } from "@/types/ApiResponse";
import { update_staff_status } from "@/db/crud/staff/management/update";

export async function update_staff(data: any): Promise<ApiResponse> {

	try {

		const staff_id: string | null = data['staff_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( staff_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Staff Status
		const result = await update_staff_status({
			staff_id,
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
